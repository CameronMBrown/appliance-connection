<?php
/**
 * Plugin Name:       AC Blocks
 * Description:        Native Gutenberg section blocks for The Appliance Connection (headless). Block attributes flow to Astro via WPGraphQL Content Blocks (`editorBlocks`).
 * Version:           0.1.0
 * Requires at least: 6.5
 * Requires PHP:      8.0
 * Author:            The Appliance Connection
 * Text Domain:       ac-blocks
 *
 * @package AcBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add a dedicated inserter category so our sections group together.
 */
add_filter(
	'block_categories_all',
	function ( array $categories ): array {
		array_unshift(
			$categories,
			array(
				'slug'  => 'ac',
				'title' => __( 'The Appliance Connection', 'ac-blocks' ),
				'icon'  => null,
			)
		);
		return $categories;
	}
);

/**
 * Minimal semantic fallback shared by the attribute-only section blocks.
 *
 * Astro is the canonical renderer; this only keeps the WordPress front end (and
 * previews) from erroring. It prints the section's heading-ish attribute and
 * nothing else — deliberately unstyled.
 *
 * @param array  $attributes Block attributes.
 * @param string $slug       Block slug without the `ac/` namespace.
 * @return string Escaped HTML.
 */
function ac_blocks_fallback( array $attributes, string $slug ): string {
	$title = '';
	foreach ( array( 'heading', 'formHeading', 'subheading', 'eyebrow' ) as $key ) {
		if ( ! empty( $attributes[ $key ] ) && is_string( $attributes[ $key ] ) ) {
			$title = $attributes[ $key ];
			break;
		}
	}
	return sprintf(
		'<section %s>%s</section>',
		get_block_wrapper_attributes( array( 'data-ac-block' => $slug ) ),
		'' !== $title ? '<h2>' . esc_html( $title ) . '</h2>' : ''
	);
}

/**
 * Register every built block.
 *
 * `@wordpress/scripts` compiles src/<block>/ -> build/<block>/, each with its own
 * block.json. We loop the build dir so adding a new block needs zero PHP changes.
 * Guarded with is_dir() so the plugin never fatals before the first `npm run build`.
 */
add_action(
	'init',
	function (): void {
		$build_dir = __DIR__ . '/build';
		if ( ! is_dir( $build_dir ) ) {
			return;
		}
		foreach ( (array) glob( $build_dir . '/*', GLOB_ONLYDIR ) as $dir ) {
			if ( file_exists( $dir . '/block.json' ) ) {
				register_block_type( $dir );
			}
		}
	}
);
