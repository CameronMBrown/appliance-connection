import { __, sprintf } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, Notice, FocalPointPicker } from '@wordpress/components';

/** One set of tiles in the Astro renderer (7 + 8). Keep in step with ImageCarousel.astro. */
const TILES_PER_SET = 15;
const MAX_SETS = 3;
const MAX_IMAGES = TILES_PER_SET * MAX_SETS;

// The photos are cropped to fit fixed tiles (object-fit: cover), so the srcset
// only lists sizes with the original's proportions: the hard-cropped thumbnail
// would otherwise swap in a different crop of the picture.
function toImage( m ) {
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
		focalX: 50,
		focalY: 50,
	};
}

/** Editor approximation — real design: web/src/components/blocks/ImageCarousel.astro. */
export default function Edit( { attributes, setAttributes } ) {
	const { heading, images = [] } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--image-carousel' } );

	const setImages = ( next ) => setAttributes( { images: next.slice( 0, MAX_IMAGES ) } );
	const patch = ( i, p ) => setImages( images.map( ( img, n ) => ( n === i ? { ...img, ...p } : img ) ) );
	const move = ( i, by ) => {
		const next = [ ...images ];
		const [ item ] = next.splice( i, 1 );
		next.splice( i + by, 0, item );
		setImages( next );
	};
	// Keep what was already tuned (alt text, focal point) when the picker is reopened.
	const onSelect = ( picked ) => {
		const list = Array.isArray( picked ) ? picked : [ picked ];
		setImages( list.map( ( m ) => images.find( ( img ) => img.id === m.id ) ?? toImage( m ) ) );
	};

	const missingAlt = images.filter( ( img ) => ! img.alt?.trim() ).length;

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Heading (hidden)', 'ac-blocks' ) }>
					<TextControl
						label={ __( 'Heading for search engines and screen readers', 'ac-blocks' ) }
						help={ __( 'Not shown on the page.', 'ac-blocks' ) }
						value={ heading }
						onChange={ ( v ) => setAttributes( { heading: v } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Photos', 'ac-blocks' ) }>
					<p className="components-base-control__help">
						{ sprintf(
							/* translators: 1: tiles per set, 2: max images. */
							__( 'Photos fill the tiles in order, %1$d tiles per set (up to %2$d photos). The tile shapes are fixed (tall, wide, square, narrow), so each photo is cropped to fit: set its focal point so the subject stays in frame. Portrait photos suit the tall, narrow and square tiles; landscape photos suit the wide ones (tiles 2, 5 and 8).', 'ac-blocks' ),
							TILES_PER_SET,
							MAX_IMAGES
						) }
					</p>
					<MediaUploadCheck>
						<MediaUpload
							multiple="add"
							gallery
							onSelect={ onSelect }
							allowedTypes={ [ 'image' ] }
							value={ images.map( ( img ) => img.id ) }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ images.length ? __( 'Edit photos', 'ac-blocks' ) : __( 'Add photos', 'ac-blocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ images.length > 0 && images.length < TILES_PER_SET && (
						<Notice status="info" isDismissible={ false }>
							{ __( 'Fewer photos than tiles: the photos repeat to fill the last tiles.', 'ac-blocks' ) }
						</Notice>
					) }
					{ missingAlt > 0 && (
						<Notice status="warning" isDismissible={ false }>
							{ __( 'Every photo needs alt text. Fill in the empty ones below.', 'ac-blocks' ) }
						</Notice>
					) }
					{ images.map( ( img, i ) => (
						<div key={ img.id ?? i } style={ { marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #ddd' } }>
							<TextControl
								label={ sprintf(
									/* translators: %d: tile number. */
									__( 'Tile %d alt text', 'ac-blocks' ),
									( i % TILES_PER_SET ) + 1
								) }
								value={ img.alt }
								onChange={ ( v ) => patch( i, { alt: v } ) }
								__nextHasNoMarginBottom
							/>
							<FocalPointPicker
								url={ img.url }
								value={ { x: ( img.focalX ?? 50 ) / 100, y: ( img.focalY ?? 50 ) / 100 } }
								onChange={ ( { x, y } ) => patch( i, { focalX: Math.round( x * 100 ), focalY: Math.round( y * 100 ) } ) }
							/>
							<Button size="small" disabled={ i === 0 } onClick={ () => move( i, -1 ) }>{ __( 'Up', 'ac-blocks' ) }</Button>
							<Button size="small" disabled={ i === images.length - 1 } onClick={ () => move( i, 1 ) }>{ __( 'Down', 'ac-blocks' ) }</Button>
							<Button size="small" isDestructive onClick={ () => setImages( images.filter( ( _, n ) => n !== i ) ) }>
								{ __( 'Remove', 'ac-blocks' ) }
							</Button>
						</div>
					) ) }
				</PanelBody>
			</InspectorControls>

			<p className="components-base-control__help">
				{ __( 'Image carousel (heading hidden on the page):', 'ac-blocks' ) } <strong>{ heading }</strong>
			</p>
			{ images.length ? (
				<div style={ { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: '4px' } }>
					{ images.map( ( img, i ) => (
						<img
							key={ img.id ?? i }
							src={ img.url }
							alt=""
							style={ { width: '100%', aspectRatio: '1', objectFit: 'cover', objectPosition: `${ img.focalX ?? 50 }% ${ img.focalY ?? 50 }%`, display: 'block' } }
						/>
					) ) }
				</div>
			) : (
				<p style={ { padding: '1rem', background: '#eee' } }>{ __( 'Pick the photos in the block settings.', 'ac-blocks' ) }</p>
			) }
		</div>
	);
}
