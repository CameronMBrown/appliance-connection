import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import ListControl from '../shared/ListControl';
import { SectionHeaderInline, SectionHeaderPanel } from '../shared/SectionHeaderFields';

/** Editor approximation — real design: web/src/components/blocks/Faq.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--faq' } );
	return (
		<div { ...blockProps }>
			<InspectorControls>
				<SectionHeaderPanel attributes={ attributes } setAttributes={ setAttributes } />
				<PanelBody title={ __( 'Footnote', 'ac-blocks' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Line under the list', 'ac-blocks' ) }
						value={ attributes.footnote }
						onChange={ ( footnote ) => setAttributes( { footnote } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<SectionHeaderInline attributes={ attributes } setAttributes={ setAttributes } />
			<ListControl
				label={ __( 'Questions', 'ac-blocks' ) }
				itemLabel={ __( 'question', 'ac-blocks' ) }
				value={ attributes.items }
				fields={ [
					{ key: 'question', label: __( 'Question', 'ac-blocks' ) },
					{ key: 'answer', label: __( 'Answer', 'ac-blocks' ), type: 'textarea' },
				] }
				onChange={ ( items ) => setAttributes( { items } ) }
			/>
		</div>
	);
}
