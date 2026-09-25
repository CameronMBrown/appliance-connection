/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** WPGraphQL endpoint (used once the frontend is wired to live WordPress). */
  readonly WPGRAPHQL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
