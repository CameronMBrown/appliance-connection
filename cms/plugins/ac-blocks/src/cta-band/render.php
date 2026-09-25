<?php
/**
 * Headless fallback render for ac/cta-band. Astro is canonical.
 *
 * @var array $attributes
 *
 * @package AcBlocks
 */

$heading = isset( $attributes['heading'] ) ? (string) $attributes['heading'] : '';
if ( '' === $heading ) {
	return;
}
$is_dark    = ! empty( $attributes['isDark'] );
$wrap_class = $is_dark ? 'on-dark' : '';
?>
<section <?php echo get_block_wrapper_attributes( array( 'class' => $wrap_class, 'data-ac-block' => 'cta-band' ) ); ?>>
	<h2 class="ac-cta-band__heading"><?php echo esc_html( $heading ); ?></h2>
	<?php if ( ! empty( $attributes['text'] ) ) : ?>
		<p class="ac-cta-band__text"><?php echo esc_html( $attributes['text'] ); ?></p>
	<?php endif; ?>
	<?php if ( ! empty( $attributes['ctaUrl'] ) && ! empty( $attributes['ctaLabel'] ) ) : ?>
		<a class="ac-cta-band__cta" href="<?php echo esc_url( $attributes['ctaUrl'] ); ?>">
			<?php echo esc_html( $attributes['ctaLabel'] ); ?>
		</a>
	<?php endif; ?>
</section>
