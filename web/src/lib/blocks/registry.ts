/**
 * The heart of the headless render pipeline: a map from a Gutenberg block name
 * (as it arrives in `editorBlocks`) to the Astro component that renders it.
 *
 * Adding a section = add one block (cms/) + one renderer here. See the
 * `headless-conventions` skill for the full step-by-step.
 *
 * Renderers follow the Claude Design system (design-system/): static sections
 * are Astro ports of its components/templates; interactive ones (Hero, Faq,
 * Contact) mount its React components as islands.
 */
import Hero from '../../components/blocks/Hero.astro';
import PageHeader from '../../components/blocks/PageHeader.astro';
import Trust from '../../components/blocks/Trust.astro';
import Intro from '../../components/blocks/Intro.astro';
import Partners from '../../components/blocks/Partners.astro';
import StatBlock from '../../components/blocks/StatBlock.astro';
import ServiceMap from '../../components/blocks/ServiceMap.astro';
import ServiceGrid from '../../components/blocks/ServiceGrid.astro';
import ServiceCard from '../../components/blocks/ServiceCard.astro';
import MediaText from '../../components/blocks/MediaText.astro';
import TownGrid from '../../components/blocks/TownGrid.astro';
import Testimonials from '../../components/blocks/Testimonials.astro';
import Faq from '../../components/blocks/Faq.astro';
import Contact from '../../components/blocks/Contact.astro';
import CtaBand from '../../components/blocks/CtaBand.astro';
import Stack from '../../components/blocks/Stack.astro';

export const registry = {
  'ac/hero': Hero,
  'ac/page-header': PageHeader,
  'ac/trust': Trust,
  'ac/intro': Intro,
  'ac/partners': Partners,
  'ac/stat-block': StatBlock,
  'ac/service-map': ServiceMap,
  'ac/service-grid': ServiceGrid,
  'ac/service-card': ServiceCard,
  'ac/media-text': MediaText,
  'ac/town-grid': TownGrid,
  'ac/testimonials': Testimonials,
  'ac/faq': Faq,
  'ac/contact': Contact,
  'ac/cta-band': CtaBand,
  'ac/stack': Stack,
} as const;

export type BlockName = keyof typeof registry;
