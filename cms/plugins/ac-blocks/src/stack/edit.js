import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import ListControl from '../shared/ListControl';

/**
 * Editor approximation — real design: web/src/components/blocks/Stack.astro.
 * Items without a photo show a graph-paper placeholder on the page, so a card
 * is never broken while photos are still being shot.
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--stack' } );
	return (
		<div { ...blockProps }>
			<TextControl
				label={ __( 'Section heading (not shown on the page)', 'ac-blocks' ) }
				help={ __( 'A level-2 heading read by screen readers and search engines, so the item titles (level 3) sit under it. Fill it in; clearing it removes the heading.', 'ac-blocks' ) }
				value={ attributes.heading }
				onChange={ ( heading ) => setAttributes( { heading } ) }
			/>
			<ListControl
				label={ __( 'Items (3 to 8). The eyebrow stays visible when the next card stacks over this one.', 'ac-blocks' ) }
				itemLabel={ __( 'item', 'ac-blocks' ) }
				min={ 3 }
				max={ 8 }
				value={ attributes.items }
				fields={ [
					{ key: 'eyebrow', label: __( 'Eyebrow (required)', 'ac-blocks' ) },
					{ key: 'title', label: __( 'Title (required)', 'ac-blocks' ) },
					{ key: 'body', label: __( 'Body (required)', 'ac-blocks' ), type: 'textarea' },
					{ key: 'image', label: __( 'photo', 'ac-blocks' ), type: 'image', responsive: true },
					{ key: 'buttonText', label: __( 'Button text (optional)', 'ac-blocks' ) },
					{ key: 'buttonUrl', label: __( 'Button link (optional)', 'ac-blocks' ) },
				] }
				onChange={ ( items ) => setAttributes( { items } ) }
			/>
		</div>
	);
}
