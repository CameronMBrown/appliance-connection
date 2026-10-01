import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { SectionHeaderInline, SectionHeaderPanel } from '../shared/SectionHeaderFields';

const AREAS = [
	{ key: 'durhamUrl', label: __( 'Durham page URL', 'ac-blocks' ) },
	{ key: 'peterboroughUrl', label: __( 'Peterborough page URL', 'ac-blocks' ) },
	{ key: 'kawarthaLakesUrl', label: __( 'Kawartha Lakes page URL', 'ac-blocks' ) },
	{ key: 'northumberlandUrl', label: __( 'Northumberland page URL', 'ac-blocks' ) },
];

/**
 * Editor approximation — real design: web/src/components/blocks/ServiceMap.astro.
 * The four regions are fixed artwork; only the link for each is editable.
 * Leave a URL empty until that page exists and the region draws without a link.
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--service-map' } );
	return (
		<div { ...blockProps }>
			<InspectorControls>
				<SectionHeaderPanel attributes={ attributes } setAttributes={ setAttributes } />
				<PanelBody title={ __( 'Region links', 'ac-blocks' ) }>
					{ AREAS.map( ( { key, label } ) => (
						<TextControl
							key={ key }
							label={ label }
							help={ __( 'Leave empty if the page does not exist yet.', 'ac-blocks' ) }
							value={ attributes[ key ] }
							onChange={ ( v ) => setAttributes( { [ key ]: v } ) }
						/>
					) ) }
				</PanelBody>
				<PanelBody title={ __( 'Call to action', 'ac-blocks' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Button label', 'ac-blocks' ) }
						help={ __( 'Leave empty to hide the button.', 'ac-blocks' ) }
						value={ attributes.primaryLabel }
						onChange={ ( primaryLabel ) => setAttributes( { primaryLabel } ) }
					/>
					<TextControl
						label={ __( 'Button URL', 'ac-blocks' ) }
						value={ attributes.primaryUrl }
						onChange={ ( primaryUrl ) => setAttributes( { primaryUrl } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<SectionHeaderInline attributes={ attributes } setAttributes={ setAttributes } />
			<p>{ __( 'Clickable service-area map (Durham, Peterborough, Kawartha Lakes, Northumberland). Links are set in the sidebar.', 'ac-blocks' ) }</p>
		</div>
	);
}
