---
---

<?php

// Assets
// ------

function {{ site.wordpress_theme_name }}_assets() { {% if site.link.google_fonts %}

  // Google Fonts

  wp_enqueue_style( 'google_fonts', 'https://fonts.googleapis.com/css?family={{ site.link.google_fonts }}' );
  {% endif %}

  // CSS

  wp_enqueue_style( 'style', get_template_directory_uri() . '/assets/css/style.min.css', array() );

  // JS / jQuery

  wp_enqueue_script( 'script', get_template_directory_uri() . '/assets/js/script.min.js', array( 'jquery' ), '', true );
}
add_action( 'wp_enqueue_scripts', '{{ site.wordpress_theme_name }}_assets' );

// Assets Version String Removal
// -----------------------------

function {{ site.wordpress_theme_name }}_assets_version_string_removal( $src ){
  return remove_query_arg( 'ver', $src );
}
add_filter( 'script_loader_src', '{{ site.wordpress_theme_name }}_assets_version_string_removal' );
add_filter( 'style_loader_src', '{{ site.wordpress_theme_name }}_assets_version_string_removal' );

// Body Classes
// ------------

function {{ site.wordpress_theme_name }}_body_classes( $classes ) {

  // No Aside

  if ( ! is_active_sidebar( 'aside' ) ) {
    $classes[] = 'no-aside';
  }

  return $classes;
}
add_filter( 'body_class', '{{ site.wordpress_theme_name }}_body_classes' );

// Disable Media Comments
// ----------------------

function {{ site.wordpress_theme_name }}_disable_media_comments( $open, $post_id ) {
  $post = get_post( $post_id );
  if( $post->post_type == 'attachment' ) {
    return false;
  }
  return $open;
}
add_filter( 'comments_open', '{{ site.wordpress_theme_name }}_disable_media_comments', 10 , 2 );

// Excerpt Read More
// -----------------

function {{ site.wordpress_theme_name }}_excerpt_read_more( $more ) {
  return ' <span>' . esc_html( '&hellip;' ) . '</span> <a href="' . get_permalink() . '" class="post-excerpt-read-more">' . esc_html( 'Read more' ) . '</a>';
}
add_filter('excerpt_more', '{{ site.wordpress_theme_name }}_excerpt_read_more');

// JavaScript Detection
// --------------------

function {{ site.wordpress_theme_name }}_javascript_detection() {
  echo "<script>with(document.documentElement){className=className.replace(/\bno-js\b/,'js')}</script>\n";
}
add_action( 'wp_head', '{{ site.wordpress_theme_name }}_javascript_detection', 0 );

// Lead Paragraph Class
// --------------------

function {{ site.wordpress_theme_name }}_lead_paragraph_class($content){
  return preg_replace( '/<p([^>]+)?>/', '<p$1 class="lead">', $content, 1 );
}
add_filter( 'the_content', '{{ site.wordpress_theme_name }}_lead_paragraph_class' );

// Prevent Editor Code Stripping
// -----------------------------

function {{ site.wordpress_theme_name }}_prevent_editor_code_stripping($initArray) {
  $opts = '*[*]';
  $initArray['valid_elements'] = $opts;
  $initArray['extended_valid_elements'] = $opts;
  return $initArray;
}
add_filter('tiny_mce_before_init', '{{ site.wordpress_theme_name }}_prevent_editor_code_stripping');

// Setup
// -----

function {{ site.wordpress_theme_name }}_setup() {

  // Feed Links

  add_theme_support( 'automatic-feed-links' );

  // HTML5

  add_theme_support( 'html5',
    array(
      'caption',
      'comment-form',
      'comment-list',
      'gallery',
      'search-form'
    )
  );

  // Post Formats

  add_theme_support( 'post-formats',
    array(
      'aside',
      'audio',
      'chat',
      'gallery',
      'image',
      'link',
      'quote',
      'status',
      'video'
    )
  );

  // Post Thumbnails

  add_image_size( 'small', 640 );
  add_image_size( 'xlarge', 1440 );
  add_theme_support( 'post-thumbnails' );
  update_option( 'large_size_h', 0 );
  update_option( 'large_size_w', 1200 );
  update_option( 'medium_size_h', 0 );
  update_option( 'medium_size_w', 1024 );
  update_option( 'thumbnail_size_h', 160 );
  update_option( 'thumbnail_size_w', 160 );

  // Title Tag

  add_theme_support( 'title-tag' );

  // Remove Unwanted Head Components

  remove_action( 'wp_head', 'rsd_link' );
  remove_action( 'wp_head', 'wlwmanifest_link' );
  remove_action( 'wp_head', 'wp_generator' );

  // Menus

  register_nav_menus(
    array(
      'nav_menu' => 'Nav Menu',
      'social_nav_menu' => 'Social Nav Menu',
      'footer_nav_menu' => 'Footer Nav Menu'
    )
  );
}
add_action( 'init', '{{ site.wordpress_theme_name }}_setup' );

// Video Container Class
// ---------------------

function {{ site.wordpress_theme_name }}_video_container_class($html, $url, $attr, $post_id) {
  return '<div class="video-container">' . $html . '</div>';
}
add_filter('embed_oembed_html', '{{ site.wordpress_theme_name }}_video_container_class', 99, 4);

// Widget Tag Cloud Font Sizes
// ---------------------------

function {{ site.wordpress_theme_name }}_widget_tag_cloud_font_sizes( $args ) {
  $args['format'] = 'list';
  $args['largest'] = .875;
  $args['smallest'] = .875;
  $args['unit'] = 'rem';
  return $args;
}
add_filter( 'widget_tag_cloud_args', '{{ site.wordpress_theme_name }}_widget_tag_cloud_font_sizes' );

// Widgets
// -------

function {{ site.wordpress_theme_name }}_widgets() {

  // Aside

  register_sidebar(
    array(
      'class' => 'aside',
      'description' => 'Add widgets for the aside area',
      'id' => 'aside',
      'name' => 'Aside',
      'before_widget' => '<div class="widget %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>'
    )
  );
}
add_action( 'widgets_init', '{{ site.wordpress_theme_name }}_widgets' );