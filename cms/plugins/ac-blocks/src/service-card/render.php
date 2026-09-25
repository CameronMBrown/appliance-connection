<?php
/**
 * Headless fallback render for ac/service-card. Astro is canonical.
 *
 * @var array $attributes
 *
 * @package AcBlocks
 */

$title = isset( $attributes['title'] ) ? (string) $attributes['title'] : '';
if ( '' === $title ) {
	return;
}
?>
<article <?php echo get_block_wrapper_attributes( array( 'data-ac-block' => 'service-card' ) ); ?>>
	<h3 class="ac-service-card__title"><?php echo esc_html( $title ); ?></h3>
	<?php if ( ! empty( $attributes['description'] ) ) : ?>
		<p class="ac-service-card__desc"><?php echo esc_html( $attributes['description'] ); ?></p>
	<?php endif; ?>
	<?php if ( ! empty( $attributes['url'] ) ) : ?>
		<a class="ac-service-card__link" href="<?php echo esc_url( $attributes['url'] ); ?>">
			<?php esc_html_e( 'Learn more', 'ac-blocks' ); ?>
		</a>
	<?php endif; ?>
</article>
