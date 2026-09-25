import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import ListControl from '../shared/ListControl';
import { SectionHeaderInline, SectionHeaderPanel } from '../shared/SectionHeaderFields';

/**
 * Editor approximation — real design: web/src/components/blocks/TownGrid.astro.
 * Give a town a page URL only when that page exists; the rest list as plain cells.
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--town-grid' } );
	return (
		<div { ...blockProps }>
			<InspectorControls>
				<SectionHeaderPanel attributes={ attributes } setAttributes={ setAttributes } />
			</InspectorControls>
			<SectionHeaderInline attributes={ attributes } setAttributes={ setAttributes } />
			<ListControl
				label={ __( 'Regions', 'ac-blocks' ) }
				itemLabel={ __( 'region', 'ac-blocks' ) }
				value={ attributes.regions }
				fields={ [
					{ key: 'name', label: __( 'Region name', 'ac-blocks' ) },
					{ key: 'href', label: __( 'Region page URL (optional)', 'ac-blocks' ) },
					{ key: 'note', label: __( 'Note (e.g. Same-week booking)', 'ac-blocks' ) },
					{
						key: 'towns',
						label: __( 'Towns', 'ac-blocks' ),
						type: 'list',
						itemLabel: __( 'town', 'ac-blocks' ),
						fields: [
							{ key: 'name', label: __( 'Town', 'ac-blocks' ) },
							{ key: 'href', label: __( 'Town page URL (only if it exists)', 'ac-blocks' ) },
						],
					},
				] }
				onChange={ ( regions ) => setAttributes( { regions } ) }
			/>
		</div>
	);
}
