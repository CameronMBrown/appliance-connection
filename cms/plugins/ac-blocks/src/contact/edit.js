import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import ListControl from '../shared/ListControl';

/**
 * Editor approximation — real design: web/src/components/blocks/Contact.astro.
 * The form fields themselves are fixed by the design system's QuoteForm; only
 * its copy and the side panels are editable. Phones come from site settings.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { formEyebrow, formHeading, formIntro, hours, hoursNote, areaText } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--contact' } );
	const text = ( key ) => ( v ) => setAttributes( { [ key ]: v } );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Form copy (optional overrides)', 'ac-blocks' ) }>
					<TextControl label={ __( 'Eyebrow', 'ac-blocks' ) } value={ formEyebrow } onChange={ text( 'formEyebrow' ) } placeholder="Get in touch" />
					<TextControl label={ __( 'Heading', 'ac-blocks' ) } value={ formHeading } onChange={ text( 'formHeading' ) } placeholder="Tell us what you need" />
					<TextControl label={ __( 'Intro', 'ac-blocks' ) } value={ formIntro } onChange={ text( 'formIntro' ) } placeholder="We respond within 24 hours." />
				</PanelBody>
			</InspectorControls>
			<p className="ac-edit__eyebrow">{ __( 'Quote form + call panel', 'ac-blocks' ) }</p>
			<ListControl
				label={ __( 'Hours', 'ac-blocks' ) }
				itemLabel={ __( 'row', 'ac-blocks' ) }
				value={ hours }
				fields={ [
					{ key: 'day', label: __( 'Day(s)', 'ac-blocks' ) },
					{ key: 'time', label: __( 'Hours', 'ac-blocks' ) },
				] }
				onChange={ ( v ) => setAttributes( { hours: v } ) }
			/>
			<TextControl label={ __( 'Hours note', 'ac-blocks' ) } value={ hoursNote } onChange={ text( 'hoursNote' ) } />
			<TextareaControl label={ __( 'Where we work', 'ac-blocks' ) } value={ areaText } onChange={ text( 'areaText' ) } />
		</div>
	);
}
