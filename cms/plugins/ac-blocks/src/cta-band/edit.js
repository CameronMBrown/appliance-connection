import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { heading, text, ctaLabel, ctaUrl, isDark, showPhone } = attributes;
	const blockProps = useBlockProps( {
		className: `ac-edit ac-edit--cta-band${ isDark ? ' is-dark' : '' }`,
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Treatment', 'ac-blocks' ) }>
					<ToggleControl
						label={ __( 'Dark band', 'ac-blocks' ) }
						help={ __( 'Renders on the dark (.on-dark) surface in Astro.', 'ac-blocks' ) }
						checked={ !! isDark }
						onChange={ ( v ) => setAttributes( { isDark: v } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Call to action', 'ac-blocks' ) }>
					<TextControl
						label={ __( 'Label', 'ac-blocks' ) }
						value={ ctaLabel }
						onChange={ ( v ) => setAttributes( { ctaLabel: v } ) }
					/>
					<TextControl
						label={ __( 'URL', 'ac-blocks' ) }
						value={ ctaUrl }
						onChange={ ( v ) => setAttributes( { ctaUrl: v } ) }
					/>
					<ToggleControl
						label={ __( 'Add the region phone button', 'ac-blocks' ) }
						help={ __( 'Uses the number for this page’s region.', 'ac-blocks' ) }
						checked={ !! showPhone }
						onChange={ ( v ) => setAttributes( { showPhone: v } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<RichText
				tagName="h2"
				value={ heading }
				allowedFormats={ [] }
				onChange={ ( v ) => setAttributes( { heading: v } ) }
				placeholder={ __( 'CTA heading…', 'ac-blocks' ) }
			/>
			<RichText
				tagName="p"
				value={ text }
				onChange={ ( v ) => setAttributes( { text: v } ) }
				placeholder={ __( 'Supporting line…', 'ac-blocks' ) }
			/>
		</div>
	);
}
