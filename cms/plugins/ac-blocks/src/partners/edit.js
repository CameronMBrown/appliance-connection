import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import ListControl from '../shared/ListControl';
import { BackgroundControl } from '../shared/SectionHeaderFields';

/** Editor approximation — real design: web/src/components/blocks/Partners.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const { heading, partners, background } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--partners' } );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Section', 'ac-blocks' ) }>
					<BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
				</PanelBody>
			</InspectorControls>
			<RichText tagName="h2" value={ heading } allowedFormats={ [] } onChange={ ( v ) => setAttributes( { heading: v } ) } placeholder={ __( 'Heading…', 'ac-blocks' ) } />
			<ListControl
				label={ __( 'Partners', 'ac-blocks' ) }
				itemLabel={ __( 'partner', 'ac-blocks' ) }
				value={ partners }
				fields={ [
					{ key: 'name', label: __( 'Name', 'ac-blocks' ) },
					{ key: 'logoUrl', label: __( 'logo', 'ac-blocks' ), type: 'image' },
					{ key: 'url', label: __( 'Website', 'ac-blocks' ) },
					{ key: 'area', label: __( 'Area line (e.g. Serving Durham Region)', 'ac-blocks' ) },
					{ key: 'phone', label: __( 'Phone (display)', 'ac-blocks' ) },
					{ key: 'tel', label: __( 'Phone (dial digits, e.g. 19052596545)', 'ac-blocks' ) },
					{ key: 'email', label: __( 'Email', 'ac-blocks' ) },
					{ key: 'address', label: __( 'Address', 'ac-blocks' ), type: 'lines' },
					{ key: 'mapEmbedUrl', label: __( 'Map embed URL (OpenStreetMap)', 'ac-blocks' ) },
					{ key: 'directionsUrl', label: __( 'Directions URL', 'ac-blocks' ) },
				] }
				onChange={ ( v ) => setAttributes( { partners: v.map( ( { logoUrlAlt, ...p } ) => p ) } ) }
			/>
		</div>
	);
}
