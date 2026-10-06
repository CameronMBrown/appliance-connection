<?php
/**
 * Seed WordPress from content.json (exported from the Astro fixtures).
 *
 * Creates/updates, idempotently (matched by slug):
 *  - pages      /, /services, /about, /contact, /privacy, /legal (front page = home)
 *  - ac_service one per /services/{slug}
 *  - ac_location region hubs (/durham, /peterborough, /kawartha-lakes, /northumberland) + towns as their children,
 *                tagged with the ac_region term; hubs carry the region phone
 *  - menus      primary (with dropdowns), footer, legal
 *
 * Every body is a list of our native blocks, serialized exactly as the block
 * editor would save them (attribute-only: `<!-- wp:ac/hero {…} /-->`).
 *
 * Run: wp eval-file cms/scripts/seed/seed.php   (re-running updates in place)
 *
 * Drift guard: the seed overwrites page bodies, so before writing anything it
 * checks every existing post against the fingerprint stored at the last seed
 * (`_ac_seed_fingerprint`). If a post was edited in WP since then, the seed
 * aborts and lists it, touching nothing. Pull the edits first with
 * export-from-wp.php and port them into web/src/fixtures/pages.ts, or discard
 * them deliberately:
 *
 *   wp eval-file cms/scripts/seed/seed.php force      (or AC_SEED_FORCE=1)
 *
 * @package AcCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/lib.php';

$ac_force = in_array( 'force', isset( $args ) ? (array) $args : array(), true ) || (bool) getenv( 'AC_SEED_FORCE' );

// Save as an administrator so kses leaves the editor's rich text (links) intact,
// exactly as if an admin had saved the block in the editor.
$ac_admins = get_users( array( 'role' => 'administrator', 'number' => 1, 'fields' => 'ID' ) );
if ( $ac_admins ) {
	wp_set_current_user( (int) $ac_admins[0] );
}

$ac_seed = json_decode( (string) file_get_contents( __DIR__ . '/content.json' ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
if ( ! is_array( $ac_seed ) ) {
	WP_CLI::error( 'content.json missing or invalid — run export-fixtures.mjs first.' );
}

/**
 * Fixture block → the array shape serialize_blocks() expects. Inner blocks need
 * one `null` placeholder per child in innerContent.
 */
function ac_seed_block( array $b ): array {
	$inner = array_map( 'ac_seed_block', $b['innerBlocks'] ?? array() );
	return array(
		'blockName'    => $b['name'],
		'attrs'        => $b['attributes'] ?? array(),
		'innerBlocks'  => $inner,
		'innerHTML'    => '',
		'innerContent' => array_fill( 0, count( $inner ), null ),
	);
}

/**
 * Hero media (video renditions + poster) is chosen in the editor from the Media
 * Library; the fixtures can't know attachment IDs. On re-seed, carry the hero's
 * existing media attributes over so re-running doesn't wipe them.
 */
function ac_seed_keep_hero_media( array $blocks, string $existing_content ): array {
	$keys = ac_seed_hero_media_keys();
	$kept = array();
	foreach ( parse_blocks( $existing_content ) as $b ) {
		if ( 'ac/hero' === $b['blockName'] ) {
			$kept = array_intersect_key( $b['attrs'], array_flip( $keys ) );
			break;
		}
	}
	if ( ! $kept ) {
		return $blocks;
	}
	foreach ( $blocks as &$b ) {
		if ( 'ac/hero' === $b['name'] ) {
			$b['attributes'] = array_merge( $b['attributes'] ?? array(), $kept );
		}
	}
	unset( $b );
	return $blocks;
}

/** Collects posts edited in WP since their last seed (static so it works however WP-CLI scopes this file). */
function ac_seed_drift_log( ?array $entry = null ): array {
	static $log = array();
	if ( $entry ) {
		$log[] = $entry;
	}
	return $log;
}

/**
 * Create or update one post; returns its ID.
 *
 * With $dry, writes nothing: it only records drift (the DB copy differs from
 * both the last-seeded copy and what this seed would write) and returns the
 * existing ID (0 if none) so child posts can still resolve their parent.
 */
function ac_seed_post( string $type, string $slug, string $title, array $page, int $parent = 0, int $order = 0, bool $dry = false ): int {
	$found  = get_posts(
		array(
			'post_type'   => $type,
			'name'        => $slug,
			'post_parent' => $parent,
			'post_status' => 'any',
			'numberposts' => 1,
		)
	);
	$new_fp = ac_seed_fingerprint( $page['blocks'], false, $page['title'] ?? '', $page['description'] ?? '' );
	if ( $dry ) {
		if ( ! $found ) {
			return 0;
		}
		$current  = ac_seed_post_fingerprint( $found[0] );
		$baseline = (string) get_post_meta( $found[0]->ID, '_ac_seed_fingerprint', true );
		if ( $current !== $new_fp && $current !== $baseline ) {
			ac_seed_drift_log(
				array(
					'label'  => sprintf( '%s %s', $type, $slug ),
					'reason' => '' === $baseline ? 'no seed baseline and content differs from fixtures' : 'edited in WP since last seed',
				)
			);
		}
		return $found[0]->ID;
	}
	if ( $found ) {
		$page['blocks'] = ac_seed_keep_hero_media( $page['blocks'], $found[0]->post_content );
	}
	$content = serialize_blocks( array_map( 'ac_seed_block', $page['blocks'] ) );
	$data    = array(
		'post_type'    => $type,
		'post_name'    => $slug,
		'post_title'   => $title,
		'post_content' => wp_slash( $content ),
		'post_excerpt' => $page['description'] ?? '',
		'post_status'  => 'publish',
		'post_parent'  => $parent,
		'menu_order'   => $order,
	);
	if ( $found ) {
		$data['ID'] = $found[0]->ID;
	}
	$id = wp_insert_post( $data, true );
	if ( is_wp_error( $id ) ) {
		WP_CLI::error( "{$type} {$slug}: " . $id->get_error_message() );
	}
	update_post_meta( $id, 'ac_seo_title', $page['title'] ?? '' );
	update_post_meta( $id, 'ac_seo_description', $page['description'] ?? '' );
	update_post_meta( $id, '_ac_seed_fingerprint', $new_fp );
	WP_CLI::log( sprintf( '  %-12s %-28s #%d', $type, $slug, $id ) );
	return $id;
}

/** The page-header / hero heading, else the fallback — used as the admin title. */
function ac_seed_title( array $page, string $fallback ): string {
	foreach ( $page['blocks'] as $b ) {
		if ( 'ac/page-header' === $b['name'] && ! empty( $b['attributes']['heading'] ) ) {
			return $b['attributes']['heading'];
		}
	}
	return $fallback;
}

$ac_region_names = array(
	'durham'       => 'Durham Region',
	'peterborough' => 'Peterborough',
	// Service areas with no dedicated phone yet: same hub shape, no ac_phone meta.
	'kawartha-lakes' => 'Kawartha Lakes',
	'northumberland' => 'Northumberland',
);

/**
 * Walk every fixture page and create/update its post. With $dry, nothing is
 * written: ac_seed_post() only records drift (see its docblock).
 */
function ac_seed_content( array $seed, array $region_names, array $terms, bool $dry ): void {
	$hubs  = array();
	$order = 0;

	// Hubs before towns (towns need their parent), so sort by path depth.
	$paths = array_keys( $seed['pages'] );
	usort( $paths, fn( $a, $b ) => substr_count( $a, '/' ) <=> substr_count( $b, '/' ) ); // stable: keeps fixture order within a depth

	foreach ( $paths as $path ) {
		$page  = $seed['pages'][ $path ];
		$parts = array_values( array_filter( explode( '/', $path ) ) );

		if ( '/' === $path ) {
			$id = ac_seed_post( 'page', 'home', 'Home', $page, 0, 0, $dry );
			if ( ! $dry ) {
				update_option( 'show_on_front', 'page' );
				update_option( 'page_on_front', $id );
			}
		} elseif ( 'services' === $parts[0] && 2 === count( $parts ) ) {
			ac_seed_post( 'ac_service', $parts[1], ac_seed_title( $page, $parts[1] ), $page, 0, ++$order, $dry );
		} elseif ( isset( $region_names[ $parts[0] ] ) ) {
			$region = $parts[0];
			if ( 1 === count( $parts ) ) {
				$id              = ac_seed_post( 'ac_location', $region, $region_names[ $region ], $page, 0, 0, $dry );
				$hubs[ $region ] = $id;
				$phone           = $seed['phones'][ $region ] ?? null;
				if ( $phone && ! $dry ) {
					update_post_meta( $id, 'ac_phone', $phone['phone'] );
				}
			} else {
				$town = ucwords( str_replace( '-', ' ', $parts[1] ) );
				$id   = ac_seed_post( 'ac_location', $parts[1], $town, $page, $hubs[ $region ] ?? 0, 0, $dry );
			}
			if ( ! $dry ) {
				wp_set_object_terms( $id, array( $terms[ $region ] ), 'ac_region' );
			}
		} else {
			ac_seed_post( 'page', $parts[0], ac_seed_title( $page, ucfirst( $parts[0] ) ), $page, 0, 0, $dry );
		}
	}
}

// --- Drift guard: dry pass first, so a refusal leaves WP untouched ----------------
ac_seed_content( $ac_seed, $ac_region_names, array(), true );
$ac_drift = ac_seed_drift_log();
if ( $ac_drift ) {
	WP_CLI::warning( 'These posts were edited in WP since the last seed; seeding would overwrite them:' );
	foreach ( $ac_drift as $d ) {
		WP_CLI::log( sprintf( '  %-40s %s', $d['label'], $d['reason'] ) );
	}
	if ( ! $ac_force ) {
		WP_CLI::error(
			"Nothing was changed. Run export-from-wp.php to pull the edits and port them into web/src/fixtures/pages.ts (then npm run seed:export), or discard them deliberately: wp eval-file cms/scripts/seed/seed.php force"
		);
	}
	WP_CLI::warning( 'force: overwriting the edits above.' );
}

// --- Region terms -------------------------------------------------------------
$ac_terms = array();
foreach ( $ac_region_names as $slug => $name ) {
	$term = term_exists( $slug, 'ac_region' );
	if ( ! $term ) {
		$term = wp_insert_term( $name, 'ac_region', array( 'slug' => $slug ) );
	}
	$ac_terms[ $slug ] = (int) $term['term_id'];
}

WP_CLI::log( 'Content:' );
ac_seed_content( $ac_seed, $ac_region_names, $ac_terms, false );

// The default WP sample content isn't part of this site.
foreach ( array( 'sample-page' => 'page', 'hello-world' => 'post' ) as $slug => $type ) {
	$p = get_page_by_path( $slug, OBJECT, $type );
	if ( $p ) {
		wp_trash_post( $p->ID );
	}
}

// --- Menus -----------------------------------------------------------------
/**
 * (Re)build a menu of custom links. Links are front-end paths ("/durham/"),
 * which Astro serves as-is — editors can change labels/order/links in
 * Appearance → Menus without a deploy of new code.
 */
function ac_seed_menu( string $name, string $location, array $items ): void {
	$menu = wp_get_nav_menu_object( $name );
	if ( $menu ) {
		wp_delete_nav_menu( $menu->term_id );
	}
	$menu_id = wp_create_nav_menu( $name );
	$add     = function ( array $item, int $parent = 0 ) use ( &$add, $menu_id ) {
		$id = wp_update_nav_menu_item(
			$menu_id,
			0,
			array(
				'menu-item-title'     => $item['label'],
				'menu-item-url'       => $item['href'],
				'menu-item-type'      => 'custom',
				'menu-item-status'    => 'publish',
				'menu-item-parent-id' => $parent,
			)
		);
		foreach ( $item['children'] ?? array() as $child ) {
			$add( $child, $id );
		}
	};
	foreach ( $items as $item ) {
		$add( $item );
	}
	$locations              = get_theme_mod( 'nav_menu_locations', array() );
	$locations[ $location ] = $menu_id;
	set_theme_mod( 'nav_menu_locations', $locations );
	WP_CLI::log( "  menu {$name} → {$location}" );
}

WP_CLI::log( 'Menus:' );
ac_seed_menu( 'Primary', 'primary', $ac_seed['nav'] );
ac_seed_menu(
	'Footer',
	'footer',
	array(
		array( 'label' => 'Services', 'href' => '/services/' ),
		array( 'label' => 'About', 'href' => '/about/' ),
		array( 'label' => 'Contact', 'href' => '/contact/' ),
	)
);
ac_seed_menu(
	'Legal',
	'legal',
	array(
		array( 'label' => 'Privacy', 'href' => '/privacy/' ),
		array( 'label' => 'Legal', 'href' => '/legal/' ),
	)
);

flush_rewrite_rules();
WP_CLI::success( 'Seeded.' );
