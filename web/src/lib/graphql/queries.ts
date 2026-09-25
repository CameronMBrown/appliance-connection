/**
 * Illustrative WPGraphQL queries for when WP goes live (fixtures-first for now).
 *
 * WPGraphQL Content Blocks exposes `editorBlocks`, and each block's attributes
 * come via a typed inline fragment (`... on AcHeroBlock { attributes { … } }`).
 * The exact fragment type names depend on the generated schema — run GraphQL
 * Codegen against the live endpoint and let it type these. See docs/02.
 */
export const PAGE_BY_URI = /* GraphQL */ `
  query PageByUri($uri: ID!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on ContentNode {
        # editorBlocks flattens the block tree; flat: false keeps innerBlocks nested.
        editorBlocks(flat: false) {
          __typename
          name
          # ... on AcHeroBlock { attributes { eyebrow heading subheading } }
          # ... on AcServiceGridBlock { attributes { heading } }
          # ... on AcCtaBandBlock { attributes { heading text ctaLabel ctaUrl isDark } }
        }
      }
    }
  }
`;
