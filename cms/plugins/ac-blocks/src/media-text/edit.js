import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import ListControl from '../shared/ListControl';
import { BackgroundControl } from '../shared/SectionHeaderFields';

/** Editor approximation — real design: web/src/components/blocks/MediaText.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const { heading, paragraphs, imageUrl, background } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--media-text' } );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Section', 'ac-blocks' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( m ) => setAttributes( { imageId: m.id, imageUrl: m.url, imageAlt: m.alt } ) }
							allowedTypes={ [ 'image' ] }
							value={ attributes.imageId }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ imageUrl ? __( 'Replace illustration', 'ac-blocks' ) : __( 'Add illustration', 'ac-blocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					<BackgroundControl allowDark value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
				</PanelBody>
			</InspectorControls>
			<RichText tagName="h2" value={ heading } allowedFormats={ [] } onChange={ ( v ) => setAttributes( { heading: v } ) } placeholder={ __( 'Heading…', 'ac-blocks' ) } />
			<ListControl
				label={ __( 'Paragraphs', 'ac-blocks' ) }
				itemLabel={ __( 'paragraph', 'ac-blocks' ) }
				value={ paragraphs.map( ( p ) => ( { p } ) ) }
				fields={ [ { key: 'p', label: __( 'Paragraph', 'ac-blocks' ), type: 'rich' } ] }
				onChange={ ( v ) => setAttributes( { paragraphs: v.map( ( x ) => x.p ) } ) }
			/>
		</div>
	);
}
