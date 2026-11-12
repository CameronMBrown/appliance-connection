<?php
/**
 * Seed the ac_testimonial CPT from testimonials.json.
 *
 * Unlike pages, testimonials are NOT owned by the fixtures: WP is the source of
 * truth (client adds/edits them in WP admin) and testimonials.json is the
 * committed backup written by export-testimonials.php. So this script is
 * create-only: a testimonial that already exists (matched by slug, any status)
 * is left untouched and reported as skipped. To overwrite existing ones from
 * the JSON deliberately:
 *
 *   wp eval-file cms/scripts/seed/seed-testimonials.php force-testimonials
 *   (or AC_SEED_TESTIMONIALS_FORCE=1)
 *
 * Also run at the end of seed.php, so a fresh DB gets its testimonials back.
 *
 * Run: wp eval-file cms/scripts/seed/seed-testimonials.php
 *
 * @package AcCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Term slug → display name ("kitchen-range" → "Kitchen Range"). */
function ac_seed_term_name( string $slug ): string {
	return ucwords( str_replace( '-', ' ', $slug ) );
}

/** Slugs → term IDs for $taxonomy, creating missing terms. */
function ac_seed_term_ids( array $slugs, string $taxonomy ): array {
	$ids = array();
	foreach ( $slugs as $slug ) {
		$slug = sanitize_title( (string) $slug );
		if ( '' === $slug ) {
			continue;
		}
		$term = term_exists( $slug, $taxonomy );
		if ( ! $term ) {
			$term = wp_insert_term( ac_seed_term_name( $slug ), $taxonomy, array( 'slug' => $slug ) );
		}
		if ( is_wp_error( $term ) ) {
			WP_CLI::warning( "term {$taxonomy}/{$slug}: " . $term->get_error_message() );
			continue;
		}
		$ids[] = (int) $term['term_id'];
	}
	return $ids;
}

/** Plain quote text → paragraph block markup, as the editor would save it. */
function ac_seed_quote_markup( string $quote ): string {
	$paras = preg_split( '/\n{2,}/', trim( $quote ) );
	$out   = array();
	foreach ( (array) $paras as $p ) {
		$out[] = '<!-- wp:paragraph --><p>' . esc_html( $p ) . '</p><!-- /wp:paragraph -->';
	}
	return implode( "\n\n", $out );
}

function ac_seed_testimonials( bool $force ): void {
	$file = __DIR__ . '/testimonials.json';
	$data = json_decode( (string) file_get_contents( $file ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	if ( ! is_array( $data ) || ! isset( $data['testimonials'] ) ) {
		WP_CLI::error( 'testimonials.json missing or invalid.' );
	}

	WP_CLI::log( 'Testimonials:' );
	foreach ( $data['testimonials'] as $t ) {
		$slug = sanitize_title( $t['slug'] ?? '' );
		if ( '' === $slug ) {
			WP_CLI::warning( 'skipping a testimonial with no slug.' );
			continue;
		}

		$existing = get_posts(
			array(
				'post_type'      => 'ac_testimonial',
				'name'           => $slug,
				'post_status'    => 'any',
				'posts_per_page' => 1,
				'fields'         => 'ids',
			)
		);
		if ( $existing && ! $force ) {
			WP_CLI::log( "  {$slug}: exists, left as-is" );
			continue;
		}

		$postarr = array(
			'post_type'    => 'ac_testimonial',
			'post_name'    => $slug,
			'post_title'   => (string) ( $t['author'] ?? $slug ),
			'post_content' => ac_seed_quote_markup( (string) ( $t['quote'] ?? '' ) ),
			'post_status'  => in_array( $t['status'] ?? 'publish', array( 'publish', 'draft', 'pending', 'private', 'future' ), true ) ? $t['status'] : 'publish',
		);
		if ( $existing ) {
			$postarr['ID'] = (int) $existing[0];
			$id            = wp_update_post( $postarr, true );
		} else {
			$id = wp_insert_post( $postarr, true );
		}
		if ( is_wp_error( $id ) ) {
			WP_CLI::warning( "{$slug}: " . $id->get_error_message() );
			continue;
		}

		// Optional meta: empty values are removed, so edits in WP stay clean.
		$meta = array(
			'ac_town'        => $t['town'] ?? '',
			'ac_source'      => $t['source'] ?? '',
			'ac_source_url'  => $t['sourceUrl'] ?? '',
			'ac_review_date' => $t['date'] ?? '',
		);
		foreach ( $meta as $key => $value ) {
			if ( '' === (string) $value ) {
				delete_post_meta( $id, $key );
			} else {
				update_post_meta( $id, $key, (string) $value );
			}
		}
		update_post_meta( $id, 'ac_featured', ! empty( $t['featured'] ) ? '1' : '0' );
		update_post_meta( $id, 'ac_short_review', ! empty( $t['shortReview'] ) ? '1' : '0' );

		wp_set_object_terms( $id, ac_seed_term_ids( (array) ( $t['regions'] ?? array() ), 'ac_region' ), 'ac_region' );
		wp_set_object_terms( $id, ac_seed_term_ids( (array) ( $t['appliances'] ?? array() ), 'ac_appliance' ), 'ac_appliance' );

		WP_CLI::log( sprintf( '  %s: %s', $slug, $existing ? 'overwritten' : 'created' ) );
	}
}

// Admin user, so kses treats the markup like an admin's own save (as seed.php does).
$ac_t_admins = get_users( array( 'role' => 'administrator', 'number' => 1, 'fields' => 'ID' ) );
if ( $ac_t_admins ) {
	wp_set_current_user( (int) $ac_t_admins[0] );
}

ac_seed_testimonials(
	in_array( 'force-testimonials', isset( $args ) ? (array) $args : array(), true ) || (bool) getenv( 'AC_SEED_TESTIMONIALS_FORCE' )
);
