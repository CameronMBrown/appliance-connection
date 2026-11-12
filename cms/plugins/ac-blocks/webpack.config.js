/**
 * Extends the @wordpress/scripts default config. The default auto-discovers
 * src/<block>/block.json; editor-only scripts that are not blocks (sidebar
 * panels) need an explicit entry. Output lands in build/<name>.js, and
 * ac-blocks.php enqueues them.
 */
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const extraEntries = {
	'testimonial-sidebar/index': path.resolve( __dirname, 'src/testimonial-sidebar/index.js' ),
};

const withExtras = ( config ) => {
	// Only the classic-script config gets the extra entries; the module config
	// (when enabled) is left alone.
	if ( config.output && config.output.module ) {
		return config;
	}
	const baseEntry = config.entry;
	return {
		...config,
		entry: async () => ( {
			...( typeof baseEntry === 'function' ? await baseEntry() : baseEntry ),
			...extraEntries,
		} ),
	};
};

module.exports = Array.isArray( defaultConfig )
	? defaultConfig.map( withExtras )
	: withExtras( defaultConfig );
