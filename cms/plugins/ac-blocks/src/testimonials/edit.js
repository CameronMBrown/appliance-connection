import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, RangeControl, TextControl, FormTokenField } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Editor approximation — real design: web/src/components/blocks/Testimonials.astro.
 *
 * Quotes are NOT typed here. They live in the Testimonials post type
 * (WP admin > Testimonials). This block only decides which to show:
 *   auto   = match the page's region / appliance tags (override below)
 *   manual = show exactly the pinned ones, in order
 */
export default function Edit( { attributes, setAttributes } ) {
	const { heading, mode, limit, pinned, filterRegion, filterAppliance, isDark, showGrid } = attributes;
	const blockProps = useBlockProps( { className: 'ac-edit ac-edit--testimonials' } );

	// Published + draft, so a pinned draft is still visible in the picker.
	const posts = useSelect(
		( select ) =>
			select( coreStore ).getEntityRecords( 'postType', 'ac_testimonial', {
				per_page: 100,
				status: 'publish,draft,private',
				_fields: 'id,slug,title,status',
			} ),
		[]
	);
	const termsOf = ( taxonomy ) =>
		useSelect(
			( select ) =>
				select( coreStore ).getEntityRecords( 'taxonomy', taxonomy, { per_page: 100, _fields: 'slug,name' } ),
			[]
		);
	const regions = termsOf( 'ac_region' );
	const appliances = termsOf( 'ac_appliance' );
	const termOptions = ( terms, defaultLabel ) => [
		{ label: defaultLabel, value: '' },
		...( terms || [] ).map( ( t ) => ( { label: t.name, value: t.slug } ) ),
	];
	const bySlug = new Map( ( posts || [] ).map( ( p ) => [ p.slug, p ] ) );
	const labelFor = ( p ) => `${ p.title?.rendered || p.slug } (${ p.slug })`;
	const slugFor = ( label ) => ( posts || [] ).find( ( p ) => labelFor( p ) === label )?.slug;

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Hidden heading', 'ac-blocks' ) }>
					<TextControl
						label={ __( 'Heading (screen readers / SEO only)', 'ac-blocks' ) }
						help={ __( 'Never shown on the page. Leave blank for "What our customers say".', 'ac-blocks' ) }
						value={ heading }
						onChange={ ( v ) => setAttributes( { heading: v } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Appearance', 'ac-blocks' ) }>
					<ToggleControl
						label={ __( 'Dark', 'ac-blocks' ) }
						checked={ !! isDark }
						onChange={ ( v ) => setAttributes( { isDark: v } ) }
					/>
					<ToggleControl
						label={ __( 'Grid background', 'ac-blocks' ) }
						checked={ !! showGrid }
						onChange={ ( v ) => setAttributes( { showGrid: v } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Which testimonials', 'ac-blocks' ) }>
					<SelectControl
						label={ __( 'Show', 'ac-blocks' ) }
						value={ mode }
						options={ [
							{ label: __( 'All testimonials (no filter)', 'ac-blocks' ), value: 'all' },
							{ label: __( 'Match a region (where the customer lives)', 'ac-blocks' ), value: 'region' },
							{ label: __( 'Match a service (what the quote mentions)', 'ac-blocks' ), value: 'service' },
							{ label: __( 'Pick specific ones', 'ac-blocks' ), value: 'manual' },
							{ label: __( 'Legacy: match any tag this page has', 'ac-blocks' ), value: 'auto' },
						] }
						onChange={ ( v ) => setAttributes( { mode: v } ) }
					/>
					{ mode !== 'manual' ? (
						<>
							{ ( mode === 'region' || mode === 'auto' ) && (
								<SelectControl
									label={ __( 'Region', 'ac-blocks' ) }
									help={ __( 'Default: the region this page belongs to.', 'ac-blocks' ) }
									value={ filterRegion }
									options={ termOptions( regions, __( "This page's region", 'ac-blocks' ) ) }
									onChange={ ( v ) => setAttributes( { filterRegion: v } ) }
								/>
							) }
							{ ( mode === 'service' || mode === 'auto' ) && (
								<SelectControl
									label={ __( 'Service tag', 'ac-blocks' ) }
									help={ __( "Default: the tag(s) on this service page. Tags are the Appliances taxonomy.", 'ac-blocks' ) }
									value={ filterAppliance }
									options={ termOptions( appliances, __( "This page's service", 'ac-blocks' ) ) }
									onChange={ ( v ) => setAttributes( { filterAppliance: v } ) }
								/>
							) }
							<RangeControl
								label={ __( 'Max testimonials', 'ac-blocks' ) }
								value={ limit }
								min={ 1 }
								max={ 20 }
								onChange={ ( v ) => setAttributes( { limit: v } ) }
							/>
						</>
					) : (
						<FormTokenField
							label={ __( 'Pinned testimonials (in order)', 'ac-blocks' ) }
							value={ pinned.map( ( s ) => ( bySlug.has( s ) ? labelFor( bySlug.get( s ) ) : s ) ) }
							suggestions={ ( posts || [] ).map( labelFor ) }
							onChange={ ( tokens ) =>
								setAttributes( {
									pinned: tokens.map( ( t ) => slugFor( t ) || t ).filter( Boolean ),
								} )
							}
							__experimentalExpandOnFocus
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<p className="ac-edit__note">
				{ {
					all: __( 'Any testimonial can appear here, one at a time.', 'ac-blocks' ),
					region: __( 'Only testimonials tagged with the chosen region. Nothing renders if none match.', 'ac-blocks' ),
					service: __( 'Only testimonials tagged with the chosen service. Nothing renders if none match.', 'ac-blocks' ),
					auto: __( "Testimonials matching this page's region and service tags.", 'ac-blocks' ),
					manual: `${ pinned.length } ` + __( 'pinned testimonial(s), shown in the order chosen.', 'ac-blocks' ),
				}[ mode ] }
			</p>
		</div>
	);
}
