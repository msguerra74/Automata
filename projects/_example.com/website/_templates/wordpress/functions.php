---
---

<?php

// Enqueue CSS and JS assets
// -------------------------

function {{ site.wordpress_theme_name }}_assets() {
  // CSS
  wp_enqueue_style( 'style_css', get_template_directory_uri() . '/assets/css/style.min.css', array() );
  // JS with jQuery
  wp_enqueue_script( 'script_js', get_template_directory_uri() . '/assets/js/script.min.js', array( 'jquery' ), '', true );
}

add_action( 'wp_enqueue_scripts', '{{ site.wordpress_theme_name }}_assets' );

// Remove CSS and JS version strings
// ---------------------------------

function {{ site.wordpress_theme_name }}_remove_script_version( $src ){
  return remove_query_arg( 'ver', $src );
}

add_filter( 'script_loader_src', '{{ site.wordpress_theme_name }}_remove_script_version' );
add_filter( 'style_loader_src', '{{ site.wordpress_theme_name }}_remove_script_version' );

// Setup theme defaults and register support for various features
// --------------------------------------------------------------

function {{ site.wordpress_theme_name }}_setup() {
  // Add default posts and comments RSS feed links to head
  add_theme_support( 'automatic-feed-links' );

  // Convert default core markup to valid HTML5 for various components
  add_theme_support( 'html5', array(
    'caption',
    'comment-form',
    'comment-list',
    'gallery',
    'search-form'
  ) );

  // Enable support for Post Thumbnails / Featured Images on posts and pages
  // add_image_size( 'banner-xlarge', 1200, 250, true );
  add_theme_support( 'post-thumbnails' );

  // Let WordPress manage the document title
  add_theme_support( 'title-tag' );

  // Register nav menus
  register_nav_menus( array(
		'nav_menu' => esc_html__( 'Nav Menu', '{{ site.wordpress_theme_name }}' ),
	) );

  // Remove unnecesary meta tags
  remove_action( 'wp_head', 'rsd_link' );
  remove_action( 'wp_head', 'wlwmanifest_link' );
  remove_action( 'wp_head', 'wp_generator' );
}

add_action( 'after_setup_theme', '{{ site.wordpress_theme_name }}_setup' );

// Register sidebar/widgets area
// -----------------------------

function {{ site.wordpress_theme_name }}_widgets_init() {
	register_sidebar( array(
		'name' => __( 'Aside', '{{ site.wordpress_theme_name }}' ),
		'description' => __( 'Add widgets here to appear in the aside area.', '{{ site.wordpress_theme_name }}' ),
    'id' => 'aside',
		'before_widget' => '<div class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h2>',
		'after_title' => '</h2>'
	) );
}

add_action( 'widgets_init', '{{ site.wordpress_theme_name }}_widgets_init' );

// Add .lead class to the first paragraph of the content
// -----------------------------------------------------

function lead_paragraph_class($content){
  return preg_replace( '/<p([^>]+)?>/', '<p$1 class="lead-paragraph">', $content, 1 );
}

add_filter( 'the_content', 'lead_paragraph_class' );

// Show pagination if it exists
// ----------------------------

function show_post_pagination() {
  global $wp_query;
  return ( $wp_query->max_num_pages > 1 );
}