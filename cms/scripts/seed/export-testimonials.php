<?php
/**
 * Export every ac_testimonial (published AND stored-but-unused drafts) to
 * testimonials.json. This is the committed backup of the WP data: WP is the
 * source of truth for testimonials, so run this after adding/editing any, then
 * commit the file. seed-testimonials.php restores it on a fresh DB.
 *
 * Trashed testimonials are not exported. Output is sorted by slug so diffs stay small.
 *
 * Run: wp eval-file cms/scripts/seed/export-testimonials.php
 *
 * @package AcCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$ac_posts = get_posts(
	array(
		'post_type'      => 'ac_testimonial',
		'post_status'    => array( 'publish', 'draft', 'pending', 'private', 'future' ),
		'posts_per_page' => -1,
		'orderby'        => 'name',
		'order'          => 'ASC',
	)
);

$ac_out = array();
foreach ( $ac_posts as $p ) {
	// Paragraph blocks → plain text, paragraphs separated by a blank line.
	$quote = str_replace( '</p>', "\n\n", $p->post_content );
	$quote = trim( html_entity_decode( wp_strip_all_tags( $quote ), ENT_QUOTES, 'UTF-8' ) );

	$ac_out[] = array(
		'slug'       => $p->post_name,
		'status'     => $p->post_status,
		'author'     => $p->post_title,
		'quote'      => $quote,
		'town'       => (string) get_post_meta( $p->ID, 'ac_town', true ),
		'source'     => (string) get_post_meta( $p->ID, 'ac_source', true ),
		'sourceUrl'  => (string) get_post_meta( $p->ID, 'ac_source_url', true ),
		'date'       => (string) get_post_meta( $p->ID, 'ac_review_date', true ),
		'featured'   => (bool) get_post_meta( $p->ID, 'ac_featured', true ),
		'shortReview' => (bool) get_post_meta( $p->ID, 'ac_short_review', true ),
		'regions'    => wp_list_pluck( (array) wp_get_object_terms( $p->ID, 'ac_region' ), 'slug' ),
		'appliances' => wp_list_pluck( (array) wp_get_object_terms( $p->ID, 'ac_appliance' ), 'slug' ),
	);
}

$json = wp_json_encode( array( 'testimonials' => $ac_out ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
// PHP indents 4 spaces; the repo (Prettier) uses 2.
$json = preg_replace_callback( '/^(?: {4})+/m', fn( $m ) => str_repeat( '  ', strlen( $m[0] ) / 4 ), $json );

file_put_contents( __DIR__ . '/testimonials.json', $json . "\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
WP_CLI::success( sprintf( 'Exported %d testimonial(s) to cms/scripts/seed/testimonials.json — commit it.', count( $ac_out ) ) );
