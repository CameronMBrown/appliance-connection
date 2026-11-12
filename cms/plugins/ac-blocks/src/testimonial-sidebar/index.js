import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { TextControl, ToggleControl, BaseControl } from '@wordpress/components';

/**
 * Document sidebar for the `ac_testimonial` CPT. Title = author, body = quote;
 * everything here is optional metadata. Keys match ac_core_meta_config() in
 * cms/mu-plugins/ac-core/ac-core.php. Region + Appliance tags use the core
 * taxonomy panels (both are show_in_rest).
 */
function TestimonialDetails() {
	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType(), [] );
	const [ meta, setMeta ] = useEntityProp( 'postType', 'ac_testimonial', 'meta' );

	if ( postType !== 'ac_testimonial' ) {
		return null;
	}
	const set = ( key ) => ( value ) => setMeta( { ...meta, [ key ]: value } );

	return (
		<PluginDocumentSettingPanel
			name="ac-testimonial-details"
			title={ __( 'Testimonial details', 'ac-blocks' ) }
		>
			<TextControl
				label={ __( 'Town', 'ac-blocks' ) }
				help={ __( 'Optional. Shown as the attribution, e.g. "Homeowner, Whitby".', 'ac-blocks' ) }
				value={ meta?.ac_town || '' }
				onChange={ set( 'ac_town' ) }
			/>
			<TextControl
				label={ __( 'Source', 'ac-blocks' ) }
				help={ __( 'Optional. e.g. Google review, Yellow Pages, direct.', 'ac-blocks' ) }
				value={ meta?.ac_source || '' }
				onChange={ set( 'ac_source' ) }
			/>
			<TextControl
				label={ __( 'Source URL', 'ac-blocks' ) }
				type="url"
				value={ meta?.ac_source_url || '' }
				onChange={ set( 'ac_source_url' ) }
			/>
			<BaseControl label={ __( 'Review date', 'ac-blocks' ) } id="ac-review-date">
				<input
					id="ac-review-date"
					type="date"
					value={ meta?.ac_review_date || '' }
					onChange={ ( e ) => set( 'ac_review_date' )( e.target.value ) }
				/>
			</BaseControl>
			<ToggleControl
				label={ __( 'Featured', 'ac-blocks' ) }
				help={ __( 'Featured testimonials are shown first when several match a page.', 'ac-blocks' ) }
				checked={ !! meta?.ac_featured }
				onChange={ set( 'ac_featured' ) }
			/>
			<ToggleControl
				label={ __( 'Short review', 'ac-blocks' ) }
				help={ __( 'Turn on for quotes under 100 characters.', 'ac-blocks' ) }
				checked={ !! meta?.ac_short_review }
				onChange={ set( 'ac_short_review' ) }
			/>
		</PluginDocumentSettingPanel>
	);
}

registerPlugin( 'ac-testimonial-details', { render: TestimonialDetails } );
