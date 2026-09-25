# packages/tokens (reserved)

Reserved for a future shared **design-tokens** npm package consumed by *both* the Astro
frontend and the block editor styles.

For now the **canonical source of truth is `design-system/tokens/`**
(`tokens.json` + `tokens.css`). `web/` imports `tokens.css` directly. When the block
editor needs the same variables, point its editor stylesheet at the same file rather
than duplicating values.

Promote this to a real workspace package (with its own `package.json`) only once there's
a build step worth sharing (e.g. generating `tokens.css`, Tailwind config, and a JS/TS
export from one `tokens.json`).
