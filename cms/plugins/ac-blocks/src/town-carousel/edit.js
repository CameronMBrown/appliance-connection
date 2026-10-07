import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import ListControl from '../shared/ListControl';

/** Editor approximation — real design: web/src/components/blocks/TownCarousel.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--town-carousel' } );
	return (
		<div { ...blockProps }>
			<TextControl
				label={ __( 'Label', 'ac-blocks' ) }
				help={ __( 'The small heading at the left of the strip. It is also the section’s heading for screen readers.', 'ac-blocks' ) }
				value={ attributes.heading }
				onChange={ ( heading ) => setAttributes( { heading } ) }
			/>
			<ListControl
				label={ __( 'Towns', 'ac-blocks' ) }
				itemLabel={ __( 'town', 'ac-blocks' ) }
				value={ attributes.towns }
				fields={ [ { key: 'name', label: __( 'Town', 'ac-blocks' ) } ] }
				onChange={ ( towns ) => setAttributes( { towns } ) }
			/>
		</div>
	);
}
