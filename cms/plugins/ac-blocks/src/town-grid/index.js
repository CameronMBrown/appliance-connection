import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';

/**
 * Dynamic / attribute-only block: save() returns null. Astro renders the real
 * output from `editorBlocks` — see web/src/components/blocks/TownGrid.astro.
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
