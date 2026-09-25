import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import ListControl from '../shared/ListControl';

/** Editor approximation — real design: web/src/components/blocks/Intro.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, heading, paragraphs, photos } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--intro' } );
	const text = ( key ) => ( v ) => setAttributes( { [ key ]: v } );

	return (
		<div { ...blockProps }>
			<RichText tagName="p" className="ac-edit__eyebrow" value={ eyebrow } allowedFormats={ [] } onChange={ text( 'eyebrow' ) } placeholder={ __( 'Eyebrow…', 'ac-blocks' ) } />
			<RichText tagName="h2" value={ heading } allowedFormats={ [] } onChange={ text( 'heading' ) } placeholder={ __( 'Heading…', 'ac-blocks' ) } />
			<ListControl
				label={ __( 'Paragraphs', 'ac-blocks' ) }
				itemLabel={ __( 'paragraph', 'ac-blocks' ) }
				value={ paragraphs.map( ( p ) => ( { p } ) ) }
				fields={ [ { key: 'p', label: __( 'Paragraph', 'ac-blocks' ), type: 'rich' } ] }
				onChange={ ( v ) => setAttributes( { paragraphs: v.map( ( x ) => x.p ) } ) }
			/>
			<ListControl
				label={ __( 'Photos (first is the large one)', 'ac-blocks' ) }
				itemLabel={ __( 'photo', 'ac-blocks' ) }
				value={ photos }
				fields={ [
					{ key: 'url', label: __( 'photo', 'ac-blocks' ), type: 'image' },
					{ key: 'label', label: __( 'Placeholder tag (until a photo is chosen)', 'ac-blocks' ) },
				] }
				onChange={ ( v ) =>
					// MediaUpload stores the alt as `urlAlt`; the renderer reads `alt`.
					setAttributes( { photos: v.map( ( { urlAlt, ...p } ) => ( urlAlt !== undefined ? { ...p, alt: urlAlt } : p ) ) } )
				}
			/>
		</div>
	);
}
