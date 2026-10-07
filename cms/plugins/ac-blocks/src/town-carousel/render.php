<?php
/**
 * Headless fallback render for ac/town-carousel. Astro is canonical
 * (web/src/components/blocks/TownCarousel.astro) — this only keeps the WP front
 * end from erroring. See ac_blocks_fallback() in ac-blocks.php.
 *
 * @var array $attributes Block attributes.
 *
 * @package AcBlocks
 */

echo ac_blocks_fallback( $attributes, 'town-carousel' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
