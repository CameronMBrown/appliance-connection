import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	Button,
	TextControl,
	TextareaControl,
	SelectControl,
	ToggleControl,
	Flex,
	FlexItem,
} from '@wordpress/components';

/**
 * Generic repeater for array attributes (towns, FAQs, stats, partners…).
 *
 * Every array block in this plugin edits through this one component, so the
 * client gets the same add / reorder / remove UI everywhere. Editor-only: the
 * real design lives in the Astro renderer.
 *
 * `fields` describes one item:
 *   - omitted            → items are plain strings (one text input each)
 *   - { key, label, type } with type:
 *       'text' (default) | 'textarea' | 'rich' (inline links/bold, stored as HTML)
 *       'select' (pass `options`) | 'toggle' | 'lines' (textarea ⇄ string[]) | 'image' (sets key + `${key}Alt`;
 *       with `responsive: true` also `${key}Srcset` / `${key}Width` / `${key}Height` from the sizes WP already generated)
 *       'list' (nested ListControl — pass `fields` for the inner items)
 *
 * @param {Object}   props
 * @param {string}   props.label     Group label shown above the list.
 * @param {Array}    props.value     Current array.
 * @param {Function} props.onChange  Receives the new array.
 * @param {Array}    [props.fields]  Item field definitions (see above).
 * @param {string}   [props.itemLabel] Singular noun for the add button.
 * @param {number}   [props.min]     Fewest items allowed (Remove is disabled at this count).
 * @param {number}   [props.max]     Most items allowed (Add is disabled at this count).
 */
export default function ListControl( { label, value = [], onChange, fields, itemLabel = __( 'item', 'ac-blocks' ), min = 0, max = Infinity } ) {
	const isStrings = ! fields;
	const blank = () =>
		isStrings ? '' : Object.fromEntries( fields.map( ( f ) => [ f.key, blankFor( f ) ] ) );

	const update = ( i, next ) => onChange( value.map( ( item, j ) => ( j === i ? next : item ) ) );
	const remove = ( i ) => onChange( value.filter( ( _, j ) => j !== i ) );
	const move = ( i, dir ) => {
		const j = i + dir;
		if ( j < 0 || j >= value.length ) {
			return;
		}
		const next = [ ...value ];
		[ next[ i ], next[ j ] ] = [ next[ j ], next[ i ] ];
		onChange( next );
	};

	return (
		<div className="ac-list">
			{ label && <p className="ac-list__label">{ label }</p> }
			{ value.map( ( item, i ) => (
				<div className="ac-list__item" key={ i }>
					{ isStrings ? (
						<TextControl
							label={ `${ itemLabel } ${ i + 1 }` }
							value={ item }
							onChange={ ( v ) => update( i, v ) }
						/>
					) : (
						fields.map( ( f ) => (
							<Field
								key={ f.key }
								field={ f }
								item={ normalise( item ) }
								onChange={ ( patch ) => update( i, { ...normalise( item ), ...patch } ) }
							/>
						) )
					) }
					<Flex justify="flex-start" gap={ 1 }>
						<FlexItem>
							<Button size="small" icon="arrow-up-alt2" label={ __( 'Move up', 'ac-blocks' ) } onClick={ () => move( i, -1 ) } disabled={ i === 0 } />
						</FlexItem>
						<FlexItem>
							<Button size="small" icon="arrow-down-alt2" label={ __( 'Move down', 'ac-blocks' ) } onClick={ () => move( i, 1 ) } disabled={ i === value.length - 1 } />
						</FlexItem>
						<FlexItem>
							<Button size="small" isDestructive variant="link" onClick={ () => remove( i ) } disabled={ value.length <= min }>
								{ __( 'Remove', 'ac-blocks' ) }
							</Button>
						</FlexItem>
					</Flex>
				</div>
			) ) }
			<Button variant="secondary" onClick={ () => onChange( [ ...value, blank() ] ) } disabled={ value.length >= max }>
				{ __( 'Add', 'ac-blocks' ) } { itemLabel }
			</Button>
		</div>
	);
}

/** Towns may arrive as plain strings (legacy/fixtures); edit them as objects. */
function normalise( item ) {
	return typeof item === 'string' ? { name: item } : item;
}

/**
 * Reuse the sizes WordPress already generated for the attachment (thumbnail,
 * medium, large, …) as a `srcset`, so Astro can serve a phone the small file
 * instead of the full-size photo. Built at pick time, so no extra query.
 */
function responsiveAttrs( key, media ) {
	const byWidth = new Map();
	Object.values( media.sizes ?? {} ).forEach( ( s ) => s?.url && s.width && byWidth.set( s.width, s.url ) );
	if ( media.url && media.width ) {
		byWidth.set( media.width, media.url );
	}
	const srcset = [ ...byWidth ]
		.sort( ( a, b ) => a[ 0 ] - b[ 0 ] )
		.map( ( [ w, url ] ) => `${ url } ${ w }w` )
		.join( ', ' );
	return {
		[ `${ key }Srcset` ]: srcset,
		[ `${ key }Width` ]: media.width,
		[ `${ key }Height` ]: media.height,
	};
}

function blankFor( field ) {
	switch ( field.type ) {
		case 'toggle':
			return false;
		case 'lines':
		case 'list':
			return [];
		default:
			return '';
	}
}

function Field( { field, item, onChange } ) {
	const { key, label, type = 'text' } = field;
	const value = item[ key ];

	switch ( type ) {
		case 'textarea':
			return <TextareaControl label={ label } value={ value ?? '' } onChange={ ( v ) => onChange( { [ key ]: v } ) } />;
		case 'rich':
			return (
				<div className="ac-list__rich">
					<p className="ac-list__label">{ label }</p>
					<RichText
						tagName="p"
						value={ value ?? '' }
						allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
						onChange={ ( v ) => onChange( { [ key ]: v } ) }
					/>
				</div>
			);
		case 'select':
			return (
				<SelectControl
					label={ label }
					value={ value ?? '' }
					options={ field.options }
					onChange={ ( v ) => onChange( { [ key ]: v } ) }
				/>
			);
		case 'toggle':
			return <ToggleControl label={ label } checked={ !! value } onChange={ ( v ) => onChange( { [ key ]: v } ) } />;
		case 'lines':
			return (
				<TextareaControl
					label={ label }
					help={ __( 'One per line.', 'ac-blocks' ) }
					value={ ( value ?? [] ).join( '\n' ) }
					onChange={ ( v ) => onChange( { [ key ]: v.split( '\n' ) } ) }
				/>
			);
		case 'image':
			return (
				<MediaUploadCheck>
					<MediaUpload
						allowedTypes={ [ 'image' ] }
						onSelect={ ( m ) =>
							onChange( {
								[ key ]: m.url,
								[ `${ key }Alt` ]: m.alt,
								...( field.responsive ? responsiveAttrs( key, m ) : {} ),
							} )
						}
						render={ ( { open } ) => (
							<div className="ac-list__image">
								{ value && <img src={ value } alt="" style={ { maxWidth: '120px', display: 'block' } } /> }
								<Button variant="secondary" onClick={ open }>
									{ value ? __( 'Replace', 'ac-blocks' ) : __( 'Choose', 'ac-blocks' ) } { label }
								</Button>
							</div>
						) }
					/>
				</MediaUploadCheck>
			);
		case 'list':
			return (
				<ListControl
					label={ label }
					value={ value ?? [] }
					fields={ field.fields }
					itemLabel={ field.itemLabel }
					onChange={ ( v ) => onChange( { [ key ]: v } ) }
				/>
			);
		default:
			return <TextControl label={ label } value={ value ?? '' } onChange={ ( v ) => onChange( { [ key ]: v } ) } />;
	}
}
