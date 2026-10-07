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
					{
						key: 'art',
						label: __( 'Graphic', 'ac-blocks' ),
						type: 'select',
						options: [
							{ label: __( 'None', 'ac-blocks' ), value: '' },
							{ label: __( 'Badge (30+ years)', 'ac-blocks' ), value: 'years' },
							{ label: __( 'Contracts (licensed)', 'ac-blocks' ), value: 'licensed' },
							{ label: __( 'Stamp with check mark', 'ac-blocks' ), value: 'stamp' },
							{ label: __( 'Shield and truck (warranty)', 'ac-blocks' ), value: 'warranty' },
							{ label: __( 'Handshake (installs)', 'ac-blocks' ), value: 'handshake' },
						],
					},
					{ key: 'mark', label: __( 'Credential ✓ (when no graphic)', 'ac-blocks' ), type: 'toggle' },
				] }
				onChange={ ( stats ) => setAttributes( { stats } ) }
			/>
		</div>
	);
}
