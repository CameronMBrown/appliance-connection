#!/usr/bin/env bash
#
# Symlink our tracked WP code (cms/) into Local's wp-content. Idempotent — safe to
# re-run. WP core stays in Local, outside this repo; we only ever track cms/.
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# Local site root is the parent of this repo; wp-content lives under app/public.
WP_CONTENT="$(dirname "$REPO_ROOT")/app/public/wp-content"

echo "Repo:        $REPO_ROOT"
echo "wp-content:  $WP_CONTENT"

if [[ ! -d "$WP_CONTENT" ]]; then
	echo "ERROR: wp-content not found at that path. Is the Local site set up, and is this repo beside Local's app/?" >&2
	exit 1
fi

link() {
	local src="$1" dest="$2"
	if [[ ! -e "$src" ]]; then
		echo "  skip (missing source): $src"
		return
	fi
	ln -sfn "$src" "$dest"           # -f replace, -n don't descend into an existing symlinked dir
	echo "  linked: $dest"
}

mkdir -p "$WP_CONTENT/mu-plugins"

echo "Plugins:"
link "$REPO_ROOT/cms/plugins/ac-blocks" "$WP_CONTENT/plugins/ac-blocks"

echo "Themes:"
link "$REPO_ROOT/cms/themes/ac-headless" "$WP_CONTENT/themes/ac-headless"

echo "MU-plugins:"
link "$REPO_ROOT/cms/mu-plugins/ac-core-loader.php" "$WP_CONTENT/mu-plugins/ac-core-loader.php"
link "$REPO_ROOT/cms/mu-plugins/ac-core"            "$WP_CONTENT/mu-plugins/ac-core"

echo ""
echo "Done."
echo "Next in WP admin:"
echo "  1. Activate the 'AC Blocks' plugin and the 'AC Headless' theme."
echo "  2. Install + activate 'WPGraphQL' and 'WPGraphQL Content Blocks'."
echo "  3. Build the blocks:  npm --prefix cms/plugins/ac-blocks install && npm --prefix cms/plugins/ac-blocks run build"
