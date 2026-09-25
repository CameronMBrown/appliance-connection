<?php
/**
 * Headless fallback render for ac/town-grid. Astro is canonical
 * (web/src/components/blocks/TownGrid.astro) — this only keeps the WP front
 * end from erroring. See ac_blocks_fallback() in ac-blocks.php.
 *
 * @var array $attributes Block attributes.
 *
 * @package AcBlocks
 */

echo ac_blocks_fallback( $attributes, 'town-grid' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
