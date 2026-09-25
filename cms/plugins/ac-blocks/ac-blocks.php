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
