# packages/tokens (reserved)

Reserved for a future shared **design-tokens** npm package consumed by *both* the Astro
frontend and the block editor styles.

For now the **source of truth is the Claude Design project**, mirrored in
`design-system/tokens/*.css` (see `design-system/SOURCE.md`). `web/` imports those files
directly. When the block editor needs the same variables, point its editor stylesheet at the
same files rather than duplicating values.

Promote this to a real workspace package (with its own `package.json`) only once there's
a build step worth sharing (e.g. a JS/TS export or editor `theme.json` palette generated
from the token CSS).
