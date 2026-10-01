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

/**
 * Admin labels for a CPT. Without these WordPress falls back to "Post" (or
 * "Page" for hierarchical types), so a Location's editor would say "Edit Page".
 */
function ac_core_cpt_labels( string $single, string $plural ): array {
	return array(
		'name'          => $plural,
		'singular_name' => $single,
		/* translators: %s: singular post type name. */
		'add_new_item'  => sprintf( __( 'Add New %s', 'ac-core' ), $single ),
		/* translators: %s: singular post type name. */
		'edit_item'     => sprintf( __( 'Edit %s', 'ac-core' ), $single ),
		/* translators: %s: singular post type name. */
		'view_item'     => sprintf( __( 'View %s', 'ac-core' ), $single ),
		/* translators: %s: plural post type name. */
		'all_items'     => sprintf( __( 'All %s', 'ac-core' ), $plural ),
		/* translators: %s: singular post type name. */
		'parent_item_colon' => sprintf( __( 'Parent %s:', 'ac-core' ), $single ),
	);
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
					'labels'              => ac_core_cpt_labels( __( 'Service', 'ac-core' ), __( 'Services', 'ac-core' ) ),
					'menu_icon'           => 'dashicons-hammer',
					'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
					'rewrite'             => array( 'slug' => 'services' ),
					'has_archive'         => false,
					'graphql_single_name' => 'Service',
					'graphql_plural_name' => 'Services',
				)
			)
		);

		// Location — region hub (top level) + town page (child of its hub), so the
		// hierarchy mirrors the front-end URLs: /durham/ and /durham/oshawa/.
		// Structure is LOCKED (dev owns layout).
		register_post_type(
			'ac_location',
			array_merge(
				$common,
				array(
					'label'               => __( 'Locations', 'ac-core' ),
					'labels'              => ac_core_cpt_labels( __( 'Location', 'ac-core' ), __( 'Locations', 'ac-core' ) ),
					'menu_icon'           => 'dashicons-location',
					'hierarchical'        => true,
					'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'page-attributes' ),
					'rewrite'             => array( 'slug' => 'locations' ),
					'has_archive'         => false,
					'graphql_single_name' => 'Location',
					'graphql_plural_name' => 'Locations',
					// templateLock: a fixed block skeleton the client can fill but not restructure.
					// Mirrors the Claude Design "Location" template (design-system/templates/location).
					'template'            => array(
						array( 'ac/page-header', array( 'eyebrow' => 'Service area', 'showPhone' => true ) ),
						array( 'ac/stat-block' ),
						array( 'ac/service-grid' ),
						array( 'ac/media-text' ),
						array( 'ac/town-grid' ),
						array( 'ac/testimonials' ),
						array( 'ac/faq' ),
						array( 'ac/partners' ),
						array( 'ac/cta-band', array( 'showPhone' => true ) ),
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
					'labels'              => ac_core_cpt_labels( __( 'Project', 'ac-core' ), __( 'Projects', 'ac-core' ) ),
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
					'labels'              => ac_core_cpt_labels( __( 'Testimonial', 'ac-core' ), __( 'Testimonials', 'ac-core' ) ),
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
					'labels'              => ac_core_cpt_labels( __( 'Brand', 'ac-core' ), __( 'Brands', 'ac-core' ) ),
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
	// SEO title/description — every routable type gets them.
	$seo = array(
		'ac_seo_title'       => array( 'type' => 'string', 'graphql' => 'seoTitle',       'gqlType' => 'String' ),
		'ac_seo_description' => array( 'type' => 'string', 'graphql' => 'seoDescription', 'gqlType' => 'String' ),
	);
	return array(
		'page'        => $seo,
		'ac_service'  => $seo + array(
			'ac_icon'  => array( 'type' => 'string',  'graphql' => 'icon',         'gqlType' => 'String' ),
			'ac_order' => array( 'type' => 'integer', 'graphql' => 'serviceOrder', 'gqlType' => 'Int' ),
		),
		'ac_location' => $seo + array(
			// Region hubs only: the number shown site-wide for that region.
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
		'page'        => 'Page',
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

/* -------------------------------------------------------------------------
 * Navigation menus. Registered here (not in the theme) so they exist whatever
 * theme is active. WPGraphQL exposes menus assigned to a location publicly:
 * menuItems( where: { location: PRIMARY } ).
 * ---------------------------------------------------------------------- */

add_action(
	'after_setup_theme',
	function (): void {
		register_nav_menus(
			array(
				'primary' => __( 'Primary navigation', 'ac-core' ),
				'footer'  => __( 'Footer — site links', 'ac-core' ),
				'legal'   => __( 'Footer — legal links', 'ac-core' ),
			)
		);
	}
);

require_once __DIR__ . '/headless.php';
