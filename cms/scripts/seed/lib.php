<?php
/**
 * Shared helpers for seed.php (fixtures → WP) and export-from-wp.php (WP → snapshot).
 *
 * The seed overwrites page bodies from content.json, so anything edited in WP
 * since the last seed would be lost. These helpers fingerprint a page's
 * editable content so the seed can tell "edited in WP since I last wrote it"
 * from "unchanged", and refuse to clobber the former.
 *
 * @package AcCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Hero media is picked in the editor and survives re-seeds, so it never counts as drift. */
function ac_seed_hero_media_keys(): array {
	return array( 'videoSources', 'posterId', 'posterUrl', 'posterSrcset', 'posterWidth', 'posterHeight' );
}

/** Recursively ksort associative arrays so attribute key order never changes a fingerprint. */
function ac_seed_canon_sort( $value ) {
	if ( ! is_array( $value ) ) {
		return $value;
	}
	$value = array_map( 'ac_seed_canon_sort', $value );
	if ( array_keys( $value ) !== range( 0, count( $value ) - 1 ) ) {
		ksort( $value );
	}
	return $value;
}

/**
 * Block tree → canonical array: name, sorted attributes, children.
 *
 * Takes either fixture blocks (`name` / `attributes`) or parse_blocks() output
 * (`blockName` / `attrs`). Whitespace between blocks is ignored, as is hero
 * media, so editor-saved and seed-saved content of the same page compare equal.
 */
function ac_seed_canon_blocks( array $blocks, bool $parsed ): array {
	$out = array();
	foreach ( $blocks as $b ) {
		$name = $parsed ? ( $b['blockName'] ?? null ) : ( $b['name'] ?? null );
		if ( null === $name || '' === $name ) {
			$html = trim( (string) ( $b['innerHTML'] ?? '' ) );
			if ( '' !== $html ) {
				$out[] = array( 'n' => 'core/freeform', 'h' => $html );
			}
			continue;
		}
		$attrs = $parsed ? ( $b['attrs'] ?? array() ) : ( $b['attributes'] ?? array() );
		if ( 'ac/hero' === $name ) {
			$attrs = array_diff_key( (array) $attrs, array_flip( ac_seed_hero_media_keys() ) );
		}
		$out[] = array(
			'n' => $name,
			'a' => ac_seed_canon_sort( (array) $attrs ),
			'c' => ac_seed_canon_blocks( $b['innerBlocks'] ?? array(), $parsed ),
		);
	}
	return $out;
}

/** Fingerprint of a page's editable content: block tree + SEO title/description. */
function ac_seed_fingerprint( array $blocks, bool $parsed, string $seo_title, string $seo_description ): string {
	return md5(
		wp_json_encode(
			array(
				'b' => ac_seed_canon_blocks( $blocks, $parsed ),
				't' => $seo_title,
				'd' => $seo_description,
			)
		)
	);
}

/** Fingerprint of what is in the DB right now for a post. */
function ac_seed_post_fingerprint( WP_Post $post ): string {
	return ac_seed_fingerprint(
		parse_blocks( $post->post_content ),
		true,
		(string) get_post_meta( $post->ID, 'ac_seo_title', true ),
		(string) get_post_meta( $post->ID, 'ac_seo_description', true )
	);
}
