import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	MediaPlaceholder,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button } from '@wordpress/components';

/** Editor approximation — real design: web/src/components/blocks/PageHeader.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, heading, intro, illustrationId, illustrationUrl, illustrationAlt, primaryLabel, primaryUrl, showPhone } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--page-header' } );
	const text = ( key ) => ( v ) => setAttributes( { [ key ]: v } );
	const selectArt = ( m ) =>
		setAttributes( { illustrationId: m.id, illustrationUrl: m.url, illustrationAlt: m.alt || '' } );
	const clearArt = () =>
		setAttributes( { illustrationId: undefined, illustrationUrl: '', illustrationAlt: '' } );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Actions', 'ac-blocks' ) }>
					<TextControl label={ __( 'Button label', 'ac-blocks' ) } value={ primaryLabel } onChange={ text( 'primaryLabel' ) } />
					<TextControl label={ __( 'Button URL', 'ac-blocks' ) } value={ primaryUrl } onChange={ text( 'primaryUrl' ) } />
					<ToggleControl
						label={ __( 'Show the region phone button', 'ac-blocks' ) }
						help={ __( 'Uses the number for this page’s region.', 'ac-blocks' ) }
						checked={ showPhone }
						onChange={ text( 'showPhone' ) }
					/>
				</PanelBody>
				{ illustrationUrl && (
					<PanelBody title={ __( 'Illustration', 'ac-blocks' ) }>
						<TextControl
							label={ __( 'Alt text', 'ac-blocks' ) }
							help={ __( 'Leave empty if the illustration is purely decorative.', 'ac-blocks' ) }
							value={ illustrationAlt }
							onChange={ text( 'illustrationAlt' ) }
						/>
						<Button variant="link" isDestructive onClick={ clearArt }>
							{ __( 'Remove illustration', 'ac-blocks' ) }
						</Button>
					</PanelBody>
				) }
			</InspectorControls>

			{ illustrationUrl && (
				<BlockControls group="other">
					<MediaReplaceFlow
						mediaId={ illustrationId }
						mediaURL={ illustrationUrl }
						allowedTypes={ [ 'image' ] }
						accept="image/*"
						onSelect={ selectArt }
						name={ __( 'Replace illustration', 'ac-blocks' ) }
					/>
				</BlockControls>
			) }

			<RichText tagName="p" className="ac-edit__eyebrow" value={ eyebrow } allowedFormats={ [] } onChange={ text( 'eyebrow' ) } placeholder={ __( 'Eyebrow…', 'ac-blocks' ) } />
			<RichText tagName="h1" value={ heading } allowedFormats={ [] } onChange={ text( 'heading' ) } placeholder={ __( 'Headline…', 'ac-blocks' ) } />
			<RichText tagName="p" value={ intro } allowedFormats={ [] } onChange={ text( 'intro' ) } placeholder={ __( 'One line of intro…', 'ac-blocks' ) } />

			<div className="ac-edit__art" style={ { marginTop: '16px' } }>
				{ illustrationUrl ? (
					<img src={ illustrationUrl } alt={ illustrationAlt } style={ { display: 'block', maxHeight: '22rem', width: 'auto', maxWidth: '100%' } } />
				) : (
					<MediaPlaceholder
						icon="format-image"
						labels={ { title: __( 'Illustration', 'ac-blocks' ), instructions: __( 'Upload or pick the image shown beside the headline.', 'ac-blocks' ) } }
						allowedTypes={ [ 'image' ] }
						accept="image/*"
						onSelect={ selectArt }
					/>
				) }
			</div>
		</div>
	);
}
