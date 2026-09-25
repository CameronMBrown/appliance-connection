import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';

/**
 * The design system's SectionHeader (eyebrow / heading / sub-line / link),
 * shared by every section block that opens with one. Eyebrow, heading and
 * sub-line edit inline; the link goes in the sidebar.
 */
export function SectionHeaderInline( { attributes, setAttributes } ) {
	const { eyebrow, heading, text } = attributes;
	return (
		<>
			<RichText
				tagName="p"
				className="ac-edit__eyebrow"
				value={ eyebrow }
				allowedFormats={ [] }
				onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
				placeholder={ __( 'Eyebrow…', 'ac-blocks' ) }
			/>
			<RichText
				tagName="h2"
				value={ heading }
				allowedFormats={ [] }
				onChange={ ( v ) => setAttributes( { heading: v } ) }
				placeholder={ __( 'Section heading…', 'ac-blocks' ) }
			/>
			<RichText
				tagName="p"
				value={ text }
				allowedFormats={ [] }
				onChange={ ( v ) => setAttributes( { text: v } ) }
				placeholder={ __( 'One line of sub-copy (optional)…', 'ac-blocks' ) }
			/>
		</>
	);
}

export function SectionHeaderPanel( { attributes, setAttributes } ) {
	const { linkLabel, linkUrl, background } = attributes;
	return (
		<PanelBody title={ __( 'Section', 'ac-blocks' ) }>
			<TextControl
				label={ __( 'Link label', 'ac-blocks' ) }
				value={ linkLabel }
				onChange={ ( v ) => setAttributes( { linkLabel: v } ) }
			/>
			<TextControl
				label={ __( 'Link URL', 'ac-blocks' ) }
				value={ linkUrl }
				onChange={ ( v ) => setAttributes( { linkUrl: v } ) }
			/>
			{ background !== undefined && <BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } /> }
		</PanelBody>
	);
}

export function BackgroundControl( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Background', 'ac-blocks' ) }
			value={ value }
			options={ [
				{ label: __( 'Paper', 'ac-blocks' ), value: 'paper' },
				{ label: __( 'Off-white', 'ac-blocks' ), value: 'alt' },
			] }
			onChange={ onChange }
		/>
	);
}
