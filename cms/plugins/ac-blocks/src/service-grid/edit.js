import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

const ALLOWED = [ 'ac/service-card' ];
const TEMPLATE = [
	[ 'ac/service-card', { title: 'Appliance installation' } ],
	[ 'ac/service-card', { title: 'Gas piping' } ],
	[ 'ac/service-card', { title: 'Kitchens' } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const { heading } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--service-grid' } );
	const innerProps = useInnerBlocksProps(
		{ className: 'ac-edit__grid' },
		{ allowedBlocks: ALLOWED, template: TEMPLATE, orientation: 'horizontal' }
	);

	return (
		<div { ...blockProps }>
			<RichText
				tagName="h2"
				value={ heading }
				allowedFormats={ [] }
				onChange={ ( v ) => setAttributes( { heading: v } ) }
				placeholder={ __( 'Section heading…', 'ac-blocks' ) }
			/>
			<div { ...innerProps } />
		</div>
	);
}
