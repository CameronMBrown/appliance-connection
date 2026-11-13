import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * One "Divider" toggle for every ac/ section block that has a `divider`
 * attribute (declared in its block.json), instead of copying the control into
 * a dozen edit.js files. The renderers draw a rule along the section's top edge
 * when it is on; it is off by default, because two neighbouring sections on the
 * graph paper read as one sheet and a line between them looks wrong. Use it
 * where the background changes (off-white or dark next to paper).
 */
const withDividerControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( ! props.name.startsWith( 'ac/' ) || typeof props.attributes?.divider === 'undefined' ) {
			return <BlockEdit { ...props } />;
		}
		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody title={ __( 'Divider', 'ac-blocks' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Line above this section', 'ac-blocks' ) }
							help={ __( 'Off by default. Turn it on where this section’s background differs from the one above it.', 'ac-blocks' ) }
							checked={ !! props.attributes.divider }
							onChange={ ( divider ) => props.setAttributes( { divider } ) }
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withDividerControl' );

addFilter( 'editor.BlockEdit', 'ac-blocks/divider-control', withDividerControl );
