import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { SectionHeaderInline, SectionHeaderPanel } from '../shared/SectionHeaderFields';

const ALLOWED = [ 'ac/service-card' ];
const TEMPLATE = [
	[ 'ac/service-card', { title: 'Appliance installation' } ],
	[ 'ac/service-card', { title: 'Gas piping' } ],
	[ 'ac/service-card', { title: 'Kitchens' } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--service-grid' } );
	const innerProps = useInnerBlocksProps(
		{ className: 'ac-edit__grid' },
		{ allowedBlocks: ALLOWED, template: TEMPLATE, orientation: 'horizontal' }
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<SectionHeaderPanel attributes={ attributes } setAttributes={ setAttributes } />
				<PanelBody title={ __( 'Cards', 'ac-blocks' ) }>
					<ToggleControl
						label={ __( 'Number the cards (01, 02…)', 'ac-blocks' ) }
						checked={ !! attributes.numbered }
						onChange={ ( numbered ) => setAttributes( { numbered } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<SectionHeaderInline attributes={ attributes } setAttributes={ setAttributes } />
			<div { ...innerProps } />
		</div>
	);
}
