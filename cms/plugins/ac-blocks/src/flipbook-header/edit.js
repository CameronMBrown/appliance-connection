import { __, sprintf } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button, Notice } from '@wordpress/components';

/** Hard cap: more than this and the first paint pays for frames nobody sees. */
const MAX_FRAMES = 15;

// One frame = one square image. The srcset is built from the WP-generated sizes
// of that image (square ones only), the same way ac/video-header builds its poster.
function toFrame( m ) {
	const full = m.sizes?.full ?? { url: m.url, width: m.width, height: m.height };
	const ratio = full.width / full.height;
	const byWidth = new Map();
	for ( const size of [ ...Object.values( m.sizes ?? {} ), full ] ) {
		if ( size.width && Math.abs( size.width / size.height - ratio ) < 0.02 ) {
			byWidth.set( size.width, size );
		}
	}
	const srcset = [ ...byWidth.values() ]
		.sort( ( a, b ) => a.width - b.width )
		.map( ( size ) => `${ size.url } ${ size.width }w` )
		.join( ', ' );
	return {
		id: m.id,
		url: full.url,
		srcset,
		width: Number( full.width ) || 0,
		height: Number( full.height ) || 0,
		alt: m.alt || '',
	};
}

const isSquare = ( f ) => ! f.width || ! f.height || Math.abs( f.width / f.height - 1 ) < 0.02;

/** Editor approximation — real design: web/src/components/blocks/FlipbookHeader.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, heading, intro, frames = [], primaryLabel, primaryUrl, showPhone } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--flipbook-header' } );
	const text = ( key ) => ( v ) => setAttributes( { [ key ]: v } );

	const setFrames = ( next ) => setAttributes( { frames: next.slice( 0, MAX_FRAMES ) } );
	const patchFrame = ( i, patch ) => setFrames( frames.map( ( f, n ) => ( n === i ? { ...f, ...patch } : f ) ) );
	const move = ( i, by ) => {
		const next = [ ...frames ];
		const [ item ] = next.splice( i, 1 );
		next.splice( i + by, 0, item );
		setFrames( next );
	};

	const missingAlt = frames.filter( ( f ) => ! f.alt?.trim() ).length;
	const notSquare = frames.filter( ( f ) => ! isSquare( f ) ).length;

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Flipbook frames', 'ac-blocks' ) }>
					<p className="components-base-control__help">
						{ sprintf(
							/* translators: %d: maximum number of frames. */
							__( 'Up to %d square (1:1) images, in play order. Each shows for exactly one second; it plays once from the first frame, ends on the last, and replays when scrolled back into view.', 'ac-blocks' ),
							MAX_FRAMES
						) }
					</p>
					<MediaUploadCheck>
						<MediaUpload
							multiple="add"
							gallery
							onSelect={ ( picked ) => setFrames( ( Array.isArray( picked ) ? picked : [ picked ] ).map( toFrame ) ) }
							allowedTypes={ [ 'image' ] }
							value={ frames.map( ( f ) => f.id ) }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ frames.length ? __( 'Edit frames', 'ac-blocks' ) : __( 'Add frames', 'ac-blocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ frames.length >= MAX_FRAMES && (
						<p className="components-base-control__help">{ __( 'Maximum reached. Extra images are dropped.', 'ac-blocks' ) }</p>
					) }
					{ notSquare > 0 && (
						<Notice status="warning" isDismissible={ false }>
							{ __( 'Some frames are not square. They are cropped to a square on the page.', 'ac-blocks' ) }
						</Notice>
					) }
					{ missingAlt > 0 && (
						<Notice status="warning" isDismissible={ false }>
							{ __( 'Every frame needs alt text. Fill in the empty ones below.', 'ac-blocks' ) }
						</Notice>
					) }
					{ frames.map( ( f, i ) => (
						<div key={ f.id ?? i } style={ { display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'flex-start' } }>
							<img src={ f.url } alt="" style={ { width: 48, height: 48, objectFit: 'cover', flex: 'none' } } />
							<div style={ { flex: 1, minWidth: 0 } }>
								<TextControl
									label={ sprintf(
										/* translators: %d: frame number. */
										__( 'Frame %d alt text', 'ac-blocks' ),
										i + 1
									) }
									value={ f.alt }
									onChange={ ( v ) => patchFrame( i, { alt: v } ) }
									__nextHasNoMarginBottom
								/>
								<Button size="small" disabled={ i === 0 } onClick={ () => move( i, -1 ) }>{ __( 'Up', 'ac-blocks' ) }</Button>
								<Button size="small" disabled={ i === frames.length - 1 } onClick={ () => move( i, 1 ) }>{ __( 'Down', 'ac-blocks' ) }</Button>
								<Button size="small" isDestructive onClick={ () => setFrames( frames.filter( ( _, n ) => n !== i ) ) }>
									{ __( 'Remove', 'ac-blocks' ) }
								</Button>
							</div>
						</div>
					) ) }
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
				{ frames[ 0 ] ? (
					<img src={ frames[ 0 ].url } alt="" style={ { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } } />
				) : (
					<p style={ { padding: '1rem' } }>{ __( 'Pick the flipbook frames in the block settings.', 'ac-blocks' ) }</p>
				) }
			</div>
			{ frames.length > 0 && (
				<p className="components-base-control__help">
					{ sprintf(
						/* translators: %d: number of frames. */
						__( 'First of %d frames shown. The page plays them one second each.', 'ac-blocks' ),
						frames.length
					) }
				</p>
			) }
		</div>
	);
}
