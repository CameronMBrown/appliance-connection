import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, ToggleControl, Button } from '@wordpress/components';

/**
 * Editor UI only. This is an APPROXIMATION of the front end — the real design
 * (video frame, arched wordmark, phone strip) lives in the design system's Hero,
 * mounted by web/src/components/blocks/Hero.astro. Keep editor styling minimal.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		subheading,
		videoUrl,
		imageUrl,
		primaryLabel,
		primaryShortLabel,
		primaryUrl,
		secondaryLabel,
		secondaryShortLabel,
		secondaryUrl,
		scrim,
		showPhones,
	} = attributes;

	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--hero' } );
	const text = ( key ) => ( v ) => setAttributes( { [ key ]: v } );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Media', 'ac-blocks' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( m ) => setAttributes( { videoId: m.id, videoUrl: m.url } ) }
							allowedTypes={ [ 'video' ] }
							value={ attributes.videoId }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ videoUrl ? __( 'Replace video (16:9)', 'ac-blocks' ) : __( 'Add video (16:9)', 'ac-blocks' ) }
								</Button>
							) }
						/>
						<MediaUpload
							onSelect={ ( m ) => setAttributes( { imageId: m.id, imageUrl: m.url } ) }
							allowedTypes={ [ 'image' ] }
							value={ attributes.imageId }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ imageUrl ? __( 'Replace fallback image', 'ac-blocks' ) : __( 'Add fallback image', 'ac-blocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					<SelectControl
						label={ __( 'Scrim', 'ac-blocks' ) }
						help={ __( 'Use Strong for bright footage.', 'ac-blocks' ) }
						value={ scrim }
						options={ [
							{ label: __( 'Standard', 'ac-blocks' ), value: 'standard' },
							{ label: __( 'Strong', 'ac-blocks' ), value: 'strong' },
						] }
						onChange={ text( 'scrim' ) }
					/>
					<ToggleControl
						label={ __( 'Phone strip under the video', 'ac-blocks' ) }
						checked={ showPhones }
						onChange={ text( 'showPhones' ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Primary button', 'ac-blocks' ) }>
					<TextControl label={ __( 'Label', 'ac-blocks' ) } value={ primaryLabel } onChange={ text( 'primaryLabel' ) } />
					<TextControl label={ __( 'Short label (mobile)', 'ac-blocks' ) } value={ primaryShortLabel } onChange={ text( 'primaryShortLabel' ) } />
					<TextControl label={ __( 'URL', 'ac-blocks' ) } value={ primaryUrl } onChange={ text( 'primaryUrl' ) } />
				</PanelBody>
				<PanelBody title={ __( 'Secondary button', 'ac-blocks' ) } initialOpen={ false }>
					<TextControl label={ __( 'Label', 'ac-blocks' ) } value={ secondaryLabel } onChange={ text( 'secondaryLabel' ) } />
					<TextControl label={ __( 'Short label (mobile)', 'ac-blocks' ) } value={ secondaryShortLabel } onChange={ text( 'secondaryShortLabel' ) } />
					<TextControl label={ __( 'URL', 'ac-blocks' ) } value={ secondaryUrl } onChange={ text( 'secondaryUrl' ) } />
				</PanelBody>
			</InspectorControls>

			<RichText
				tagName="h1"
				value={ heading }
				allowedFormats={ [] }
				onChange={ text( 'heading' ) }
				placeholder={ __( 'Headline — leave empty to lead with the arched wordmark', 'ac-blocks' ) }
			/>
			<RichText
				tagName="p"
				value={ subheading }
				allowedFormats={ [] }
				onChange={ text( 'subheading' ) }
				placeholder={ __( 'Sub-line…', 'ac-blocks' ) }
			/>
			{ videoUrl && <p className="ac-edit__meta">{ __( 'Video:', 'ac-blocks' ) } { videoUrl }</p> }
		</div>
	);
}
