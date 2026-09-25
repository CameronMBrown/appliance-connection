<?php
/**
 * Headless fallback render for ac/hero.
 *
 * Astro is the CANONICAL renderer (attributes arrive via editorBlocks). This file
 * exists only so the WordPress front end doesn't error and for optional previews.
 * Keep it minimal + semantic.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks (none here).
 * @var WP_Block $block      Block instance.
 *
 * @package AcBlocks
 */

$heading = isset( $attributes['heading'] ) ? (string) $attributes['heading'] : '';
if ( '' === $heading ) {
	return;
}
?>
<section <?php echo get_block_wrapper_attributes( array( 'data-ac-block' => 'hero' ) ); ?>>
	<?php if ( ! empty( $attributes['eyebrow'] ) ) : ?>
		<p class="ac-hero__eyebrow"><?php echo esc_html( $attributes['eyebrow'] ); ?></p>
	<?php endif; ?>
	<h1 class="ac-hero__heading"><?php echo esc_html( $heading ); ?></h1>
	<?php if ( ! empty( $attributes['subheading'] ) ) : ?>
		<p class="ac-hero__sub"><?php echo esc_html( $attributes['subheading'] ); ?></p>
	<?php endif; ?>
</section>
