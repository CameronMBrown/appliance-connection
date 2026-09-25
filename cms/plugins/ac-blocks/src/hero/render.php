<?php
/**
 * Headless fallback render for ac/hero. Astro is canonical
 * (web/src/components/blocks/Hero.astro) — this only keeps the WP front
 * end from erroring. See ac_blocks_fallback() in ac-blocks.php.
 *
 * @var array $attributes Block attributes.
 *
 * @package AcBlocks
 */

echo ac_blocks_fallback( $attributes, 'hero' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inside.
