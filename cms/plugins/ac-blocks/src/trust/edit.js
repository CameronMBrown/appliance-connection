import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import ListControl from '../shared/ListControl';

/**
 * Editor approximation — real design: web/src/components/blocks/Trust.astro.
 * Cells are positional: 1 primary, 2 and 3 secondary, 4 tertiary. Only list
 * credentials that are real; the section hides itself when empty.
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--trust' } );
	return (
		<div { ...blockProps }>
			<TextControl
				label={ __( 'Section heading (not shown on the page)', 'ac-blocks' ) }
				help={ __( 'A level-2 heading read by screen readers and search engines, so the four cell titles sit under it. Leave it descriptive; clearing it removes the heading.', 'ac-blocks' ) }
				value={ attributes.heading }
				onChange={ ( heading ) => setAttributes( { heading } ) }
			/>
			<ListControl
				label={ __( 'Cells: 1 primary, 2-3 secondary, 4 tertiary (real credentials only)', 'ac-blocks' ) }
				itemLabel={ __( 'cell', 'ac-blocks' ) }
				value={ attributes.items }
				fields={ [
					{ key: 'title', label: __( 'Title', 'ac-blocks' ) },
					{ key: 'body', label: __( 'Short copy', 'ac-blocks' ), type: 'textarea' },
					{
						key: 'art',
						label: __( 'Graphic', 'ac-blocks' ),
						type: 'select',
						options: [
							{ label: __( 'None', 'ac-blocks' ), value: '' },
							{ label: __( 'Badge (30+ years)', 'ac-blocks' ), value: 'years' },
							{ label: __( 'Contracts (licensed)', 'ac-blocks' ), value: 'licensed' },
							{ label: __( 'Shield and truck (warranty)', 'ac-blocks' ), value: 'warranty' },
							{ label: __( 'Ontario outline (local)', 'ac-blocks' ), value: 'ontario' },
						],
					},
				] }
				onChange={ ( items ) => setAttributes( { items } ) }
			/>
		</div>
	);
}
