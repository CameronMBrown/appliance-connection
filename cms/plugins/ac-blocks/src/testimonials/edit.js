import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import ListControl from '../shared/ListControl';
import { SectionHeaderInline, SectionHeaderPanel } from '../shared/SectionHeaderFields';

/**
 * Editor approximation — real design: web/src/components/blocks/Testimonials.astro.
 * Attribute as "Homeowner, {town}" — never a full name.
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--testimonials' } );
	return (
		<div { ...blockProps }>
			<InspectorControls>
				<SectionHeaderPanel attributes={ attributes } setAttributes={ setAttributes } />
			</InspectorControls>
			<SectionHeaderInline attributes={ attributes } setAttributes={ setAttributes } />
			<ListControl
				label={ __( 'Quotes', 'ac-blocks' ) }
				itemLabel={ __( 'quote', 'ac-blocks' ) }
				value={ attributes.items }
				fields={ [
					{ key: 'quote', label: __( 'Quote', 'ac-blocks' ), type: 'textarea' },
					{ key: 'cite', label: __( 'Attribution (Homeowner, Town)', 'ac-blocks' ) },
				] }
				onChange={ ( items ) => setAttributes( { items } ) }
			/>
		</div>
	);
}
