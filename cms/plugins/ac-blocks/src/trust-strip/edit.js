import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import ListControl from '../shared/ListControl';

/**
 * Editor approximation — real design: web/src/components/blocks/TrustStrip.astro.
 * Only list credentials that are real; the strip hides itself when empty.
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--trust-strip' } );
	return (
		<div { ...blockProps }>
			<ListControl
				label={ __( 'Credentials (real ones only)', 'ac-blocks' ) }
				itemLabel={ __( 'credential', 'ac-blocks' ) }
				value={ attributes.items }
				onChange={ ( items ) => setAttributes( { items } ) }
			/>
		</div>
	);
}
