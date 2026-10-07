/**
 * GraphQL for our blocks, generated from their block.json files.
 *
 * WPGraphQL Content Blocks gives each block a type named after it
 * (`ac/town-carousel` → `AcTownCarousel`) whose `attributes` has one field per
 * block.json attribute. Instead of hand-writing (and forgetting to update) a
 * fragment per block, we read every block.json at build time and generate the
 * fragments. Add an attribute in block.json → it's queried automatically.
 *
 * Array/object attributes come back as JSON strings (the `BlockAttributesArray`
 * scalar); normaliseBlocks() parses them so renderers get real arrays.
 */
import type { EditorBlock } from '../blocks/types';

interface BlockJson {
  name: string;
  attributes?: Record<string, { type?: string }>;
}

// Vite resolves this glob at build time (the repo root is in server.fs.allow).
const blockJsons = import.meta.glob<BlockJson>('../../../../cms/plugins/ac-blocks/src/*/block.json', {
  eager: true,
  import: 'default',
});

const BLOCKS = Object.values(blockJsons);

/** `ac/town-carousel` → `AcTownCarousel` (Content Blocks' type naming). */
const typeName = (blockName: string) =>
  blockName
    .split(/[/-]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');

/** Attributes whose GraphQL value is a JSON string we need to parse. */
const JSON_ATTRS = new Map(
  BLOCKS.map((b) => [
    b.name,
    new Set(
      Object.entries(b.attributes ?? {})
        .filter(([, def]) => def.type === 'array' || def.type === 'object')
        .map(([key]) => key),
    ),
  ]),
);

const fragments = BLOCKS.map((b) => {
  const fields = Object.keys(b.attributes ?? {}).join(' ');
  return fields ? `... on ${typeName(b.name)} { attributes { ${fields} } }` : '';
}).join('\n');

/**
 * Selection set for `editorBlocks(flat: false)`. Two levels deep covers our
 * only container (service-grid → service-card); add a level if blocks nest deeper.
 */
export const EDITOR_BLOCKS = /* GraphQL */ `
  editorBlocks(flat: false) {
    name
    ${fragments}
    innerBlocks {
      name
      ${fragments}
    }
  }
`;

interface RawBlock {
  name: string;
  attributes?: Record<string, unknown>;
  innerBlocks?: RawBlock[];
}

/** GraphQL editorBlocks → the EditorBlock shape our renderers take. */
export function normaliseBlocks(raw: RawBlock[] = []): EditorBlock[] {
  return raw
    .filter((b) => b?.name)
    .map((b) => {
      const jsonKeys = JSON_ATTRS.get(b.name);
      const attributes: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(b.attributes ?? {})) {
        if (value === null || value === '') continue; // let renderer defaults apply
        attributes[key] = jsonKeys?.has(key) && typeof value === 'string' ? JSON.parse(value) : value;
      }
      return { name: b.name, attributes, innerBlocks: normaliseBlocks(b.innerBlocks) };
    });
}
