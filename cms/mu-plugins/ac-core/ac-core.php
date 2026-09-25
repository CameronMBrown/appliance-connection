<?php
/**
 * AC Core — content model for The Appliance Connection (headless).
 *
 * Registers custom post types, the `region` taxonomy, structured post meta, and
 * exposes that meta to WPGraphQL. No ACF — everything here is native WordPress.
 *
 * Notes for the reader:
 *  - `show_in_rest` is required for the block editor (Gutenberg).
 *  - `show_in_graphql` + graphql names put the type on the WPGraphQL schema.
 *  - register_post_meta() alone does NOT expose meta to WPGraphQL — we do that
 *    explicitly in ac_core_register_graphql_meta() further down.
 *
 * @package AcCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* -------------------------------------------------------------------------
 * Custom post types
 * ---------------------------------------------------------------------- */

add_action(
	'init',
	function (): void {
		$common = array(
			'public'        => true,   // headless: WP front end unused, but keep queryable
			'show_ui'       => true,
			'show_in_rest'  => true,   // block editor
			'show_in_graphql' => true,
			'menu_position' => 20,
		);

		// Service — uses the block editor (sections come from our blocks).
		register_post_type(
			'ac_service',
			array_merge(
				$common,
				array(
					'label'               => __( 'Services', 'ac-core' ),
					'menu_icon'           => 'dashicons-hammer',
					'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
					'rewrite'             => array( 'slug' => 'services' ),
					'has_archive'         => false,
					'graphql_single_name' => 'Service',
					'graphql_plural_name' => 'Services',
				)
			)
		);

		// Location — region hub + city page. Structure is LOCKED (dev owns layout).
		register_post_type(
			'ac_location',
			array_merge(
				$common,
				array(
					'label'               => __( 'Locations', 'ac-core' ),
					'menu_icon'           => 'dashicons-location',
					'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
					'rewrite'             => array( 'slug' => 'locations' ),
					'has_archive'         => false,
					'graphql_single_name' => 'Location',
					'graphql_plural_name' => 'Locations',
					// templateLock: a fixed block skeleton the client can fill but not restructure.
					'template'            => array(
						array( 'ac/hero' ),
						array( 'ac/service-grid' ),
						array( 'ac/cta-band' ),
					),
					'template_lock'       => 'all',
				)
			)
		);

		// Project — portfolio (phase 2). Editor + featured image for the finished-job photo.
		register_post_type(
			'ac_project',
			array_merge(
				$common,
				array(
					'label'               => __( 'Projects', 'ac-core' ),
					'menu_icon'           => 'dashicons-portfolio',
					'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
					'rewrite'             => array( 'slug' => 'projects' ),
					'has_archive'         => false,
					'graphql_single_name' => 'Project',
					'graphql_plural_name' => 'Projects',
				)
			)
		);

		// Testimonial — mostly data (title = author); body is the quote.
		register_post_type(
			'ac_testimonial',
			array_merge(
				$common,
				array(
					'label'               => __( 'Testimonials', 'ac-core' ),
					'menu_icon'           => 'dashicons-format-quote',
					'supports'            => array( 'title', 'editor', 'custom-fields' ),
					'has_archive'         => false,
					'graphql_single_name' => 'Testimonial',
					'graphql_plural_name' => 'Testimonials',
				)
			)
		);

		// Brand — "brands we install" (title + logo + custom fields).
		register_post_type(
			'ac_brand',
			array_merge(
				$common,
				array(
					'label'               => __( 'Brands', 'ac-core' ),
					'menu_icon'           => 'dashicons-awards',
					'supports'            => array( 'title', 'thumbnail', 'custom-fields' ),
					'has_archive'         => false,
					'graphql_single_name' => 'Brand',
					'graphql_plural_name' => 'Brands',
				)
			)
		);
	}
);

/* -------------------------------------------------------------------------
 * Taxonomy — region (Durham / Peterborough). Native = free GraphQL exposure,
 * no hand-built relationship UI.
 * ---------------------------------------------------------------------- */

add_action(
	'init',
	function (): void {
		register_taxonomy(
			'ac_region',
			array( 'ac_location', 'ac_service', 'ac_project', 'ac_testimonial' ),
			array(
				'label'               => __( 'Regions', 'ac-core' ),
				'hierarchical'        => true, // category-style: a fixed, small set
				'public'              => true,
				'show_in_rest'        => true,
				'show_in_graphql'     => true,
				'graphql_single_name' => 'Region',
				'graphql_plural_name' => 'Regions',
			)
		);
	}
);

/* -------------------------------------------------------------------------
 * Structured post meta (page-level fields that aren't body content).
 * register_post_meta() gives us the field + REST (for the editor sidebar).
 * ---------------------------------------------------------------------- */

/**
 * Meta config, reused for registration AND GraphQL exposure below.
 * postType => [ metaKey => [ 'type' => wpType, 'graphql' => fieldName, 'gqlType' => graphqlType ] ]
 */
function ac_core_meta_config(): array {
	return array(
		'ac_service'  => array(
			'ac_icon'  => array( 'type' => 'string',  'graphql' => 'icon',         'gqlType' => 'String' ),
			'ac_order' => array( 'type' => 'integer', 'graphql' => 'serviceOrder', 'gqlType' => 'Int' ),
		),
		'ac_location' => array(
			'ac_phone' => array( 'type' => 'string', 'graphql' => 'phone', 'gqlType' => 'String' ),
			'ac_lat'   => array( 'type' => 'number', 'graphql' => 'lat',   'gqlType' => 'Float' ),
			'ac_lng'   => array( 'type' => 'number', 'graphql' => 'lng',   'gqlType' => 'Float' ),
		),
	);
}

add_action(
	'init',
	function (): void {
		foreach ( ac_core_meta_config() as $post_type => $metas ) {
			foreach ( $metas as $key => $def ) {
				register_post_meta(
					$post_type,
					$key,
					array(
						'type'          => $def['type'],
						'single'        => true,
						'show_in_rest'  => true,
						'auth_callback' => function () {
							return current_user_can( 'edit_posts' );
						},
					)
				);
			}
		}
	}
);

/**
 * Expose the meta on the WPGraphQL types. This is the step register_post_meta
 * does NOT do for you. Runs only when WPGraphQL is active.
 */
function ac_core_register_graphql_meta(): void {
	if ( ! function_exists( 'register_graphql_field' ) ) {
		return;
	}
	$graphql_type_for = array(
		'ac_service'  => 'Service',
		'ac_location' => 'Location',
	);
	foreach ( ac_core_meta_config() as $post_type => $metas ) {
		$gql_type = $graphql_type_for[ $post_type ] ?? null;
		if ( ! $gql_type ) {
			continue;
		}
		foreach ( $metas as $key => $def ) {
			register_graphql_field(
				$gql_type,
				$def['graphql'],
				array(
					'type'        => $def['gqlType'],
					'description'  => sprintf( 'Meta: %s', $key ),
					'resolve'     => function ( $post ) use ( $key, $def ) {
						$value = get_post_meta( $post->databaseId, $key, true );
						if ( '' === $value || null === $value ) {
							return null;
						}
						if ( 'Int' === $def['gqlType'] ) {
							return (int) $value;
						}
						if ( 'Float' === $def['gqlType'] ) {
							return (float) $value;
						}
						return (string) $value;
					},
				)
			);
		}
	}
}
add_action( 'graphql_register_types', 'ac_core_register_graphql_meta' );
