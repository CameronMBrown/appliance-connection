/**
 * The heart of the headless render pipeline: a map from a Gutenberg block name
 * (as it arrives in `editorBlocks`) to the Astro component that renders it.
 *
 * Adding a section = add one block (cms/) + one renderer here. See the
 * `headless-conventions` skill for the full step-by-step.
 */
import Hero from '../../components/blocks/Hero.astro';
import ServiceGrid from '../../components/blocks/ServiceGrid.astro';
import ServiceCard from '../../components/blocks/ServiceCard.astro';
import CtaBand from '../../components/blocks/CtaBand.astro';

export const registry = {
  'ac/hero': Hero,
  'ac/service-grid': ServiceGrid,
  'ac/service-card': ServiceCard,
  'ac/cta-band': CtaBand,
} as const;

export type BlockName = keyof typeof registry;
