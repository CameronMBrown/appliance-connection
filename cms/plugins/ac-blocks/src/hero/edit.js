import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

/**
 * Editor UI only. This is an APPROXIMATION of the front end — the real design
 * lives in the Astro renderer (web/src/components/blocks/Hero.astro). Keep editor
 * styling minimal on purpose.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow,
		heading,
		subheading,
		imageUrl,
		primaryLabel,
		primaryUrl,
		secondaryLabel,
		secondaryUrl,
	} = attributes;

	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--hero' } );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Primary CTA', 'ac-blocks' ) }>
					<TextControl
						label={ __( 'Label', 'ac-blocks' ) }
						value={ primaryLabel }
						onChange={ ( v ) => setAttributes( { primaryLabel: v } ) }
					/>
					<TextControl
						label={ __( 'URL', 'ac-blocks' ) }
						value={ primaryUrl }
						onChange={ ( v ) => setAttributes( { primaryUrl: v } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Secondary CTA', 'ac-blocks' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Label', 'ac-blocks' ) }
						value={ secondaryLabel }
						onChange={ ( v ) => setAttributes( { secondaryLabel: v } ) }
					/>
					<TextControl
						label={ __( 'URL', 'ac-blocks' ) }
						value={ secondaryUrl }
						onChange={ ( v ) => setAttributes( { secondaryUrl: v } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<RichText
				tagName="p"
				className="ac-edit__eyebrow"
				value={ eyebrow }
				allowedFormats={ [] }
				onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
				placeholder={ __( 'Eyebrow…', 'ac-blocks' ) }
			/>
			<RichText
				tagName="h1"
				value={ heading }
				allowedFormats={ [] }
				onChange={ ( v ) => setAttributes( { heading: v } ) }
				placeholder={ __( 'Headline…', 'ac-blocks' ) }
			/>
			<RichText
				tagName="p"
				value={ subheading }
				onChange={ ( v ) => setAttributes( { subheading: v } ) }
				placeholder={ __( 'Supporting line…', 'ac-blocks' ) }
			/>

			<MediaUploadCheck>
				<MediaUpload
					onSelect={ ( m ) => setAttributes( { imageId: m.id, imageUrl: m.url } ) }
					allowedTypes={ [ 'image' ] }
					value={ attributes.imageId }
					render={ ( { open } ) => (
						<Button variant="secondary" onClick={ open }>
							{ imageUrl ? __( 'Replace image', 'ac-blocks' ) : __( 'Add image', 'ac-blocks' ) }
						</Button>
					) }
				/>
			</MediaUploadCheck>
			{ imageUrl && (
				<img
					src={ imageUrl }
					alt=""
					style={ { display: 'block', maxWidth: '240px', marginTop: '8px' } }
				/>
			) }
		</div>
	);
}
