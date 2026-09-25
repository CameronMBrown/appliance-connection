/**
 * Shapes for blocks coming from WPGraphQL Content Blocks (`editorBlocks`).
 * Hand-written for now (fixtures-first); once WP is live these will be replaced /
 * augmented by GraphQL Codegen output. See docs/02-architecture.md.
 */

export interface EditorBlock<A = Record<string, unknown>> {
  /** e.g. "ac/hero" */
  name: string;
  attributes: A;
  innerBlocks?: EditorBlock[];
}

export interface HeroAttrs {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  imageUrl?: string;
  primaryLabel?: string;
  primaryUrl?: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
}

export interface ServiceGridAttrs {
  heading?: string;
}

export interface ServiceCardAttrs {
  title?: string;
  description?: string;
  icon?: string;
  url?: string;
}

export interface CtaBandAttrs {
  heading?: string;
  text?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  isDark?: boolean;
}

/** A renderable page: title + a flat list of top-level blocks. */
export interface PageData {
  title: string;
  description?: string;
  blocks: EditorBlock[];
}
