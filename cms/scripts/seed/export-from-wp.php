<?php
/**
 * Pull the live WP content into wp-pull.json and report how it differs from
 * content.json (the fixtures' export).
 *
 * Why: seed.php overwrites WP from the fixtures, so edits made in WP only
 * survive if they get back into web/src/fixtures/pages.ts. This is the WP →
 * repo half: it snapshots every page/service/location in the same shape as
 * content.json and lists, per page, which blocks changed, were added or removed.
 * Port those into pages.ts, run `npm run seed:export`, then re-seed.
 *
 * Read-only: nothing in WP is modified. Output is gitignored.
 *
 * Run: wp eval-file cms/scripts/seed/export-from-wp.php
 *
 * @package AcCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/lib.php';

/** parse_blocks() output → fixture block shape (name / attributes / innerBlocks). */
function ac_pull_blocks( array $parsed, string $label ): array {
	$out = array();
	foreach ( $parsed as $b ) {
		if ( empty( $b['blockName'] ) ) {
			if ( '' !== trim( (string) $b['innerHTML'] ) ) {
				WP_CLI::warning( "{$label}: dropped non-block content (classic/freeform HTML) that fixtures can't represent." );
			}
			continue;
		}
		$out[] = array(
			'name'        => $b['blockName'],
			'attributes'  => $b['attrs'] ? $b['attrs'] : new stdClass(),
			'innerBlocks' => ac_pull_blocks( $b['innerBlocks'], $label ),
		);
	}
	return $out;
}

/** Post → the content.json page key ("/", "/services/x", "/durham", "/durham/oshawa"). */
function ac_pull_path( WP_Post $post ): string {
	if ( 'page' === $post->post_type ) {
		return (int) get_option( 'page_on_front' ) === $post->ID ? '/' : '/' . $post->post_name;
	}
	if ( 'ac_service' === $post->post_type ) {
		return '/services/' . $post->post_name;
	}
	$parent = $post->post_parent ? get_post( $post->post_parent ) : null;
	return $parent ? '/' . $parent->post_name . '/' . $post->post_name : '/' . $post->post_name;
}

/** Human-readable block-level differences between two canonical block lists. */
function ac_pull_diff( array $fixture, array $wp ): array {
	$notes = array();
	$max   = max( count( $fixture ), count( $wp ) );
	for ( $i = 0; $i < $max; $i++ ) {
		$a = $fixture[ $i ] ?? null;
		$b = $wp[ $i ] ?? null;
		if ( null === $a ) {
			$notes[] = "block {$i}: added in WP ({$b['n']})";
		} elseif ( null === $b ) {
			$notes[] = "block {$i}: removed in WP ({$a['n']})";
		} elseif ( $a['n'] !== $b['n'] ) {
			$notes[] = "block {$i}: {$a['n']} → {$b['n']} (reordered or replaced)";
		} elseif ( $a !== $b ) {
			$notes[] = "block {$i}: {$a['n']} edited";
		}
	}
	return $notes;
}

$ac_seed = json_decode( (string) file_get_contents( __DIR__ . '/content.json' ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
$ac_seed = is_array( $ac_seed ) ? $ac_seed : array( 'pages' => array() );

$ac_posts = get_posts(
	array(
		'post_type'   => array( 'page', 'ac_service', 'ac_location' ),
		'post_status' => 'publish',
		'numberposts' => -1,
		'orderby'     => array(
			'menu_order' => 'ASC',
			'ID'         => 'ASC',
		),
	)
);

$ac_pages = array();
foreach ( $ac_posts as $ac_post ) {
	$path   = ac_pull_path( $ac_post );
	$page   = array(
		'title'       => (string) get_post_meta( $ac_post->ID, 'ac_seo_title', true ),
		'description' => (string) get_post_meta( $ac_post->ID, 'ac_seo_description', true ),
	);
	$region = 'ac_location' === $ac_post->post_type ? wp_get_object_terms( $ac_post->ID, 'ac_region', array( 'fields' => 'slugs' ) ) : array();
	if ( $region && ! is_wp_error( $region ) ) {
		$page['region'] = $region[0];
	}
	$page['blocks']    = ac_pull_blocks( parse_blocks( $ac_post->post_content ), $path );
	$ac_pages[ $path ] = $page;
}

$ac_out = __DIR__ . '/wp-pull.json';
file_put_contents( $ac_out, wp_json_encode( array( 'pages' => $ac_pages ), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . "\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
WP_CLI::log( sprintf( 'Wrote %d pages → %s', count( $ac_pages ), $ac_out ) );

// --- Report: WP vs fixtures ---------------------------------------------------
$ac_changed = 0;
foreach ( $ac_pages as $path => $page ) {
	if ( ! isset( $ac_seed['pages'][ $path ] ) ) {
		WP_CLI::log( "  {$path}: only in WP (not in fixtures)" );
		++$ac_changed;
		continue;
	}
	$fixture = $ac_seed['pages'][ $path ];
	$notes   = ac_pull_diff(
		ac_seed_canon_blocks( $fixture['blocks'], false ),
		ac_seed_canon_blocks( $page['blocks'], false )
	);
	if ( ( $fixture['title'] ?? '' ) !== $page['title'] ) {
		$notes[] = 'SEO title changed';
	}
	if ( ( $fixture['description'] ?? '' ) !== $page['description'] ) {
		$notes[] = 'SEO description changed';
	}
	if ( $notes ) {
		++$ac_changed;
		WP_CLI::log( "  {$path}" );
		foreach ( $notes as $note ) {
			WP_CLI::log( "    {$note}" );
		}
	}
}
foreach ( array_diff( array_keys( $ac_seed['pages'] ), array_keys( $ac_pages ) ) as $path ) {
	WP_CLI::log( "  {$path}: in fixtures but missing/unpublished in WP" );
	++$ac_changed;
}

if ( $ac_changed ) {
	WP_CLI::success( "{$ac_changed} page(s) differ. Port the changes from wp-pull.json into web/src/fixtures/pages.ts, then npm run seed:export." );
} else {
	WP_CLI::success( 'WP matches the fixtures. Nothing to port.' );
}
