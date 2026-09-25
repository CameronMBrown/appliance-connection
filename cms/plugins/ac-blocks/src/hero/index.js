import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';

/**
 * Dynamic / attribute-only block: save() returns null.
 * Astro is the canonical renderer — attributes reach it via WPGraphQL Content
 * Blocks (`editorBlocks`). Returning null means there's no saved markup to hit
 * block-validation errors when the design changes.
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
