import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';

/**
 * Dynamic InnerBlocks parent: the render comes from Astro / render.php, but the
 * child blocks (service cards) only persist if save() outputs them. A bare
 * `save: () => null` writes the block self-closing and silently drops every
 * child on the next editor save. InnerBlocks.Content adds no wrapper markup:
 * it serializes just the nested block comments, which WP's render (`$content`)
 * and WPGraphQL Content Blocks (`innerBlocks`) both read.
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
} );
