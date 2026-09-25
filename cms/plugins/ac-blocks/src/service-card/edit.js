import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { title, description, icon, url } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--service-card' } );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Service link', 'ac-blocks' ) }>
					<TextControl
						label={ __( 'Icon (name / slug)', 'ac-blocks' ) }
						help={ __( 'Mapped to an icon in the Astro renderer.', 'ac-blocks' ) }
						value={ icon }
						onChange={ ( v ) => setAttributes( { icon: v } ) }
					/>
					<TextControl
						label={ __( 'URL', 'ac-blocks' ) }
						value={ url }
						onChange={ ( v ) => setAttributes( { url: v } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<RichText
				tagName="h3"
				value={ title }
				allowedFormats={ [] }
				onChange={ ( v ) => setAttributes( { title: v } ) }
				placeholder={ __( 'Service title…', 'ac-blocks' ) }
			/>
			<RichText
				tagName="p"
				value={ description }
				onChange={ ( v ) => setAttributes( { description: v } ) }
				placeholder={ __( 'Short description…', 'ac-blocks' ) }
			/>
		</div>
	);
}
