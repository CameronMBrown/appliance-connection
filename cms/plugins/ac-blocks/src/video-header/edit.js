import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button } from '@wordpress/components';

// Width is read from the attachment's video metadata; the filename suffix
// (laundry-rooms-720.webm, made by web/scripts/encode-hero-video.mjs) is the fallback.
const widthFromUrl = ( url ) => Number( /-(\d{3,4})\.(?:mp4|webm)$/i.exec( url )?.[ 1 ] ) || 0;

const toSource = ( m ) => ( {
	id: m.id,
	url: m.url,
	mime: m.mime,
	width: Number( m.width ) || widthFromUrl( m.url ),
} );

// Poster srcset from the WP-generated sizes of the same square image.
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
	return { posterId: m.id, posterUrl: full.url, posterSrcset };
}

/** Editor approximation — real design: web/src/components/blocks/VideoHeader.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, heading, intro, videoSources = [], posterUrl, primaryLabel, primaryUrl, showPhone } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--video-header' } );
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
						{ __( 'Select every file from the encode script (name-480/720/960, .webm and .mp4). Square (1:1), no audio. Plays muted, once per view, stretched to about 6 seconds. The browser loads the smallest tier that is sharp enough, and nothing on Data Saver or 2G.', 'ac-blocks' ) }
					</p>
					{ videoSources.length > 0 && (
						<>
							<ul>
								{ [ ...videoSources ]
									.sort( ( a, b ) => b.width - a.width )
									.map( ( v, i ) => (
										<li key={ v.id ?? i }>{ `${ v.width || '?' }w · ${ v.mime }` }</li>
									) ) }
							</ul>
							<Button variant="link" isDestructive onClick={ () => setAttributes( { videoSources: [] } ) }>
								{ __( 'Remove video', 'ac-blocks' ) }
							</Button>
						</>
					) }
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( m ) => setAttributes( posterAttributes( m ) ) }
							allowedTypes={ [ 'image' ] }
							value={ attributes.posterId }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open } style={ { marginTop: '12px' } }>
									{ posterUrl ? __( 'Replace poster', 'ac-blocks' ) : __( 'Add poster', 'ac-blocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					<p className="components-base-control__help">
						{ __( 'Square still of the first frame (the 960px WebP). Shown while the video loads, and to visitors on Data Saver, 2G or reduced motion.', 'ac-blocks' ) }
					</p>
				</PanelBody>
				<PanelBody title={ __( 'Actions', 'ac-blocks' ) }>
					<TextControl label={ __( 'Button label', 'ac-blocks' ) } value={ primaryLabel } onChange={ text( 'primaryLabel' ) } />
					<TextControl label={ __( 'Button URL', 'ac-blocks' ) } value={ primaryUrl } onChange={ text( 'primaryUrl' ) } />
					<ToggleControl
						label={ __( 'Show the region phone button', 'ac-blocks' ) }
						help={ __( 'Uses the number for this page’s region.', 'ac-blocks' ) }
						checked={ showPhone }
						onChange={ text( 'showPhone' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<RichText tagName="p" className="ac-edit__eyebrow" value={ eyebrow } allowedFormats={ [] } onChange={ text( 'eyebrow' ) } placeholder={ __( 'Eyebrow…', 'ac-blocks' ) } />
			<RichText tagName="h1" value={ heading } allowedFormats={ [] } onChange={ text( 'heading' ) } placeholder={ __( 'Headline…', 'ac-blocks' ) } />
			<RichText tagName="p" value={ intro } allowedFormats={ [] } onChange={ text( 'intro' ) } placeholder={ __( 'One line of intro…', 'ac-blocks' ) } />

			<div style={ { marginTop: '16px', maxWidth: '20rem', aspectRatio: '1', background: '#eee' } }>
				{ posterUrl ? (
					<img src={ posterUrl } alt="" style={ { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } } />
				) : (
					<p style={ { padding: '1rem' } }>{ __( 'Pick the video renditions and poster in the block settings.', 'ac-blocks' ) }</p>
				) }
			</div>
		</div>
	);
}
