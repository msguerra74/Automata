<?php

// Enqueue CSS and JS assets

function wp_theme_assets() {

  // CSS
  wp_enqueue_style( 'style_css', get_template_directory_uri() . '/assets/css/style.min.css', array() );

  // JS with jQuery
  // wp_enqueue_script( 'script_js', get_template_directory_uri() . '/assets/js/script.min.js', array( 'jquery' ), '', true );

}

add_action( 'wp_enqueue_scripts', 'wp_theme_assets' );

// Remove CSS and JS version strings

function wp_theme_remove_script_version( $src ){

  return remove_query_arg( 'ver', $src );

}

add_filter( 'script_loader_src', 'wp_theme_remove_script_version' );
add_filter( 'style_loader_src', 'wp_theme_remove_script_version' );

// Add .lead class to the first paragraph of the content

function lead_paragraph_class($content){

  return preg_replace( '/<p([^>]+)?>/', '<p$1 class="lead-paragraph">', $content, 1 );

}

add_filter( 'the_content', 'lead_paragraph_class' );

// Show pagination if it exists

function show_post_pagination() {

  global $wp_query;
  return ( $wp_query->max_num_pages > 1 );

}

// Register sidebar/widgets area

function wp_theme_widgets_init() {

	register_sidebar( array(
		'name' => __( 'Aside', 'wp_theme' ),
		'description' => __( 'Add widgets here to appear in the aside area.', 'wp_theme' ),
    'id' => 'aside',
		'before_widget' => '<div class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h2>',
		'after_title' => '</h2>'
	) );

}

add_action( 'widgets_init', 'wp_theme_widgets_init' );

// Setup theme defaults and register support for various features

function wp_theme_setup() {

  // WordPress managed document titles
  add_theme_support( 'title-tag' );

  // Remove unnecesary meta tags
  remove_action( 'wp_head', 'rsd_link' );
  remove_action( 'wp_head', 'wlwmanifest_link' );
  remove_action( 'wp_head', 'wp_generator' );

  // Register nav menus
  register_nav_menus( array(
    'nav_menu' => __( 'Nav Menu' )
  ));

  // Convert default core markup to valid HTML5 for various components
  add_theme_support( 'html5', array(
    'caption',
    'comment-form',
    'comment-list',
    'gallery',
    'search-form'
  ) );

  // Enable featured images
  // add_image_size( 'banner', 1024, 250, true );
  add_theme_support( 'post-thumbnails' );

}

add_action( 'after_setup_theme', 'wp_theme_setup' );

/* ---------- FOR DEVELOPMENT USE ONLY ---------- */

// Live Reload changes on the local dev server

if ( in_array( $_SERVER[ 'REMOTE_ADDR' ], array( '127.0.0.1', '::1' ) ) ) {
  wp_register_script( 'livereload', 'http://localhost:35729/livereload.js?snipver=1', null, false, true );
  wp_enqueue_script( 'livereload' );
}