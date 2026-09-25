import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';

/**
 * Dynamic InnerBlocks parent. save() returns null: the child blocks still
 * serialize as a nested block tree, and both the WP render (`$content`) and
 * WPGraphQL Content Blocks (`innerBlocks`) can read them.
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
