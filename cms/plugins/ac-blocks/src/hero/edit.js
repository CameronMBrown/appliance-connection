import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, ToggleControl, Button } from '@wordpress/components';

// Width is read from the attachment's video metadata; the filename suffix
// (hero-install-1280.webm, made by web/scripts/encode-hero-video.mjs) is the fallback.
const widthFromUrl = ( url ) => Number( /-(\d{3,4})\.(?:mp4|webm)$/i.exec( url )?.[ 1 ] ) || 0;

const toSource = ( m ) => ( {
	id: m.id,
	url: m.url,
	mime: m.mime,
	width: Number( m.width ) || widthFromUrl( m.url ),
} );

// Poster srcset from the WP-generated sizes. Only sizes with the full image's
// aspect ratio qualify: WP's 150px thumbnail is a square crop.
function posterAttributes( m ) {
	const full = m.sizes?.full ?? { url: m.url, width: m.width, height: m.height };
	const ratio = full.width / full.height;
	const byWidth = new Map();
	for ( const size of [ ...Object.values( m.sizes ?? {} ), full ] ) {
		if ( size.width && Math.abs( size.width / size.height - ratio ) < 0.02 ) {
			byWidth.set( size.width, size );
		}
	}
	const posterSrcset = [ ...byWidth.values() ]
		.sort( ( a, b ) => a.width - b.width )
		.map( ( size ) => `${ size.url } ${ size.width }w` )
		.join( ', ' );
	return { posterId: m.id, posterUrl: full.url, posterSrcset, posterWidth: full.width, posterHeight: full.height };
}

/**
 * Editor UI only. This is an APPROXIMATION of the front end — the real design
 * (video frame, arched wordmark, phone strip) lives in web/src/components/islands/Hero.tsx,
 * mounted by web/src/components/blocks/Hero.astro. Keep editor styling minimal.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		subheading,
		videoSources = [],
		posterUrl,
		primaryLabel,
		primaryShortLabel,
		primaryUrl,
		secondaryLabel,
		secondaryShortLabel,
		secondaryUrl,
		scrim,
		showPhones,
	} = attributes;

	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--hero' } );
	const text = ( key ) => ( v ) => setAttributes( { [ key ]: v } );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Video', 'ac-blocks' ) }>
					<MediaUploadCheck>
						<MediaUpload
							multiple
							onSelect={ ( picked ) =>
								setAttributes( { videoSources: ( Array.isArray( picked ) ? picked : [ picked ] ).map( toSource ) } )
							}
							allowedTypes={ [ 'video' ] }
							value={ videoSources.map( ( v ) => v.id ) }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ videoSources.length ? __( 'Replace video renditions', 'ac-blocks' ) : __( 'Add video renditions', 'ac-blocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					<p className="components-base-control__help">
						{ __( 'Select every file from the encode script (hero-install-640/960/1280, .webm and .mp4). The browser loads the smallest one that is sharp enough for the screen.', 'ac-blocks' ) }
					</p>
					{ videoSources.length > 0 && (
						<>
							<ul>
								{ [ ...videoSources ]
									.sort( ( a, b ) => b.width - a.width )
									.map( ( v ) => (
										<li key={ v.id }>{ `${ v.width || '?' }w · ${ v.mime }` }</li>
									) ) }
							</ul>
							<Button variant="link" isDestructive onClick={ () => setAttributes( { videoSources: [] } ) }>
								{ __( 'Remove video', 'ac-blocks' ) }
							</Button>
						</>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Poster image', 'ac-blocks' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( m ) => setAttributes( posterAttributes( m ) ) }
							allowedTypes={ [ 'image' ] }
							value={ attributes.posterId }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ posterUrl ? __( 'Replace poster', 'ac-blocks' ) : __( 'Add poster', 'ac-blocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					<p className="components-base-control__help">
						{ __( 'Shown instantly while the video loads, and to visitors who reduce motion or save data. It is the page’s largest-contentful-paint image: use a 16:9 WebP of the first frame, about 1280px wide.', 'ac-blocks' ) }
					</p>
				</PanelBody>
				<PanelBody title={ __( 'Appearance', 'ac-blocks' ) }>
					<SelectControl
						label={ __( 'Scrim', 'ac-blocks' ) }
						help={ __( 'Use Strong for bright footage.', 'ac-blocks' ) }
						value={ scrim }
						options={ [
							{ label: __( 'Standard', 'ac-blocks' ), value: 'standard' },
							{ label: __( 'Strong', 'ac-blocks' ), value: 'strong' },
						] }
						onChange={ text( 'scrim' ) }
					/>
					<ToggleControl
						label={ __( 'Phone strip under the video', 'ac-blocks' ) }
						checked={ showPhones }
						onChange={ text( 'showPhones' ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Primary button', 'ac-blocks' ) }>
					<TextControl label={ __( 'Label', 'ac-blocks' ) } value={ primaryLabel } onChange={ text( 'primaryLabel' ) } />
					<TextControl label={ __( 'Short label (mobile)', 'ac-blocks' ) } value={ primaryShortLabel } onChange={ text( 'primaryShortLabel' ) } />
					<TextControl label={ __( 'URL', 'ac-blocks' ) } value={ primaryUrl } onChange={ text( 'primaryUrl' ) } />
				</PanelBody>
				<PanelBody title={ __( 'Secondary button', 'ac-blocks' ) } initialOpen={ false }>
					<TextControl label={ __( 'Label', 'ac-blocks' ) } value={ secondaryLabel } onChange={ text( 'secondaryLabel' ) } />
					<TextControl label={ __( 'Short label (mobile)', 'ac-blocks' ) } value={ secondaryShortLabel } onChange={ text( 'secondaryShortLabel' ) } />
					<TextControl label={ __( 'URL', 'ac-blocks' ) } value={ secondaryUrl } onChange={ text( 'secondaryUrl' ) } />
				</PanelBody>
			</InspectorControls>

			<RichText
				tagName="h1"
				value={ heading }
				allowedFormats={ [] }
				onChange={ text( 'heading' ) }
				placeholder={ __( 'Headline — leave empty to lead with the arched wordmark', 'ac-blocks' ) }
			/>
			<RichText
				tagName="p"
				value={ subheading }
				allowedFormats={ [] }
				onChange={ text( 'subheading' ) }
				placeholder={ __( 'Sub-line…', 'ac-blocks' ) }
			/>
			{ videoSources.length > 0 && (
				<p className="ac-edit__meta">
					{ __( 'Video renditions:', 'ac-blocks' ) } { videoSources.length }
				</p>
			) }
		</div>
	);
}
