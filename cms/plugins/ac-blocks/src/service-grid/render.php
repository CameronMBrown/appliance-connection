<?php
/**
 * Headless fallback render for ac/service-grid. Astro is canonical.
 *
 * @var array    $attributes
 * @var string   $content    Rendered inner service-card blocks.
 * @var WP_Block $block
 *
 * @package AcBlocks
 */

$heading = isset( $attributes['heading'] ) ? (string) $attributes['heading'] : '';
?>
<section <?php echo get_block_wrapper_attributes( array( 'data-ac-block' => 'service-grid' ) ); ?>>
	<?php if ( '' !== $heading ) : ?>
		<h2 class="ac-service-grid__heading"><?php echo esc_html( $heading ); ?></h2>
	<?php endif; ?>
	<div class="ac-service-grid__items"><?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- inner blocks self-escape. ?></div>
</section>
