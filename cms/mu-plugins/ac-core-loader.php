<?php
/**
 * AC Core — mu-plugin loader.
 *
 * WordPress only autoloads PHP files in the mu-plugins ROOT, not subdirectories.
 * This tiny loader boots the ac-core package (which lives in ./ac-core/) so we can
 * keep it as a tidy, version-controlled folder instead of one giant root file.
 *
 * @package AcCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$ac_core_main = __DIR__ . '/ac-core/ac-core.php';
if ( file_exists( $ac_core_main ) ) {
	require_once $ac_core_main;
}
