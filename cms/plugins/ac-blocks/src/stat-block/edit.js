import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import ListControl from '../shared/ListControl';

/** Editor approximation — real design: web/src/components/blocks/StatBlock.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--stat-block' } );
	return (
		<div { ...blockProps }>
			<ListControl
				label={ __( 'Stats', 'ac-blocks' ) }
				itemLabel={ __( 'stat', 'ac-blocks' ) }
				value={ attributes.stats }
				fields={ [
					{ key: 'value', label: __( 'Value (e.g. 30+, Licensed)', 'ac-blocks' ) },
					{ key: 'label', label: __( 'Label', 'ac-blocks' ) },
					{ key: 'mark', label: __( 'Credential ✓ (not a count)', 'ac-blocks' ), type: 'toggle' },
				] }
				onChange={ ( stats ) => setAttributes( { stats } ) }
			/>
		</div>
	);
}
