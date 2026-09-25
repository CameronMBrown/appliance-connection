import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button } from '@wordpress/components';

/** Editor approximation — real design: web/src/components/blocks/PageHeader.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, heading, intro, illustrationUrl, primaryLabel, primaryUrl, showPhone } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--page-header' } );
	const text = ( key ) => ( v ) => setAttributes( { [ key ]: v } );

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
				<PanelBody title={ __( 'Illustration', 'ac-blocks' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( m ) =>
								setAttributes( { illustrationId: m.id, illustrationUrl: m.url, illustrationAlt: m.alt } )
							}
							allowedTypes={ [ 'image' ] }
							value={ attributes.illustrationId }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ illustrationUrl ? __( 'Replace illustration', 'ac-blocks' ) : __( 'Add illustration', 'ac-blocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ illustrationUrl && <img src={ illustrationUrl } alt="" style={ { maxWidth: '160px', marginTop: '8px' } } /> }
				</PanelBody>
			</InspectorControls>

			<RichText tagName="p" className="ac-edit__eyebrow" value={ eyebrow } allowedFormats={ [] } onChange={ text( 'eyebrow' ) } placeholder={ __( 'Eyebrow…', 'ac-blocks' ) } />
			<RichText tagName="h1" value={ heading } allowedFormats={ [] } onChange={ text( 'heading' ) } placeholder={ __( 'Headline…', 'ac-blocks' ) } />
			<RichText tagName="p" value={ intro } allowedFormats={ [] } onChange={ text( 'intro' ) } placeholder={ __( 'One line of intro…', 'ac-blocks' ) } />
		</div>
	);
}
