<?php
/**
 * Headless glue: WordPress is the CMS, Astro is the public site.
 *
 * WordPress still has a front end of its own (the minimal ac-headless theme),
 * but nobody should see it. So:
 *  - public front-end requests redirect to the same page on the Astro site;
 *  - admin/editor "View" links point at the Astro URL, so an editor lands on
 *    the real design, not the bare fallback theme.
 *
 * GraphQL is deliberately left alone: WPGraphQL derives `uri` from the
 * permalink, and Astro builds its own paths (see ac_core_frontend_path), so
 * rewriting permalinks for GraphQL would only confuse it.
 *
 * Configure the Astro origin per environment in wp-config.php:
 *   define( 'AC_FRONTEND_URL', 'https://theapplianceconnection.ca' );
 * Defaults to Astro's dev server.
 *
 * @package AcCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The Astro site's origin, without a trailing slash.
 */
function ac_core_frontend_url(): string {
	$url = defined( 'AC_FRONTEND_URL' ) ? AC_FRONTEND_URL : 'http://localhost:4321';
	return untrailingslashit( (string) $url );
}

/**
 * The path a post lives at on the Astro site. Mirrors web/src/lib/content.ts.
 *
 *  page (front page)   → /
 *  page                → /{slug}/
 *  ac_service          → /services/{slug}/
 *  ac_location         → /{hub}/  or  /{hub}/{town}/
 *
 * @param WP_Post $post Post.
 * @return string|null Null for types that have no public page.
 */
function ac_core_frontend_path( WP_Post $post ): ?string {
	switch ( $post->post_type ) {
		case 'page':
			if ( (int) get_option( 'page_on_front' ) === $post->ID ) {
				return '/';
			}
			return '/' . get_page_uri( $post ) . '/';
		case 'ac_service':
			return '/services/' . $post->post_name . '/';
		case 'ac_location':
			return '/' . get_page_uri( $post ) . '/';
		default:
			return null;
	}
}

/**
 * Admin + editor contexts get Astro links ("View page", the editor's permalink
 * panel). REST requests from the block editor count as admin context here.
 */
function ac_core_is_editor_context(): bool {
	if ( function_exists( 'is_graphql_http_request' ) && is_graphql_http_request() ) {
		return false;
	}
	return is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST );
}

/**
 * @param string      $link Permalink.
 * @param int|WP_Post $post Post or ID.
 */
function ac_core_frontend_link( string $link, $post ): string {
	$post = get_post( $post );
	if ( ! $post || 'publish' !== $post->post_status || ! ac_core_is_editor_context() ) {
		return $link;
	}
	$path = ac_core_frontend_path( $post );
	return null === $path ? $link : ac_core_frontend_url() . $path;
}
add_filter( 'page_link', 'ac_core_frontend_link', 10, 2 );
add_filter( 'post_type_link', 'ac_core_frontend_link', 10, 2 );

/**
 * Send public front-end visitors to the Astro site. Drafts/previews stay on
 * WordPress (a static build can't render unpublished content).
 */
add_action(
	'template_redirect',
	function (): void {
		if ( is_preview() || is_admin() || wp_doing_ajax() ) {
			return;
		}
		$path = '/';
		if ( is_singular() ) {
			$post = get_queried_object();
			if ( $post instanceof WP_Post ) {
				$path = ac_core_frontend_path( $post ) ?? '/';
			}
		}
		wp_redirect( ac_core_frontend_url() . $path, 302, 'AC Headless' ); // phpcs:ignore WordPress.Security.SafeRedirect.wp_redirect_wp_redirect -- external front-end origin by design.
		exit;
	},
	1 // Before redirect_canonical (priority 10): WP's own URL fix-ups are moot here.
);
