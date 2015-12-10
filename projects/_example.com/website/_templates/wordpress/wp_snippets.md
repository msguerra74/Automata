# WordPress Snippets

## Content based on what type of page is loaded (within loop before endwhile;)

    <?php if ( is_archive() ) { ?>

      <a href="<?php the_permalink(); ?>"><?php the_title( '<h2>', '</h2>' ); ?></a>
      <?php if ( is_single () ) {
        the_time( 'F Y' ); // Display Month and Year
      }
      if ( is_category() || is_tag() ) {

      } else {
        the_content( false );
      }

    } elseif ( is_front_page() || is_home() ) { ?>

      <a href="<?php the_permalink(); ?>"><?php the_title( '<h2>', '</h2>' ); ?></a>
      <?php the_time( 'F Y' );
      the_content( false );

    } elseif ( is_page() ) { ?>

      <?php the_content(); // Display the content

    } elseif ( is_single() ) { ?>

      <p><?php the_time( 'F Y' ); ?></p>
      <?php the_category(); // Display Category
      the_tags( '<ul class="post-tags"><li>', '</li><li>', '</li></ul>' ); // Display tags in a list
      the_content();
      wp_link_pages(); // Paginate content with <!-- nexpage --> comment separators in WP backend editor

    } else { ?>

      <a href="<?php the_permalink(); ?>"><?php the_title( '<h2>', '</h2>' ); ?></a>
      <?php if ( is_single () ) {
        the_time( 'F Y' );
      }
      if ( is_category() || is_tag() ) {

      } else {
        the_content( false );
      }

    } ?>

## Custom post types registered in functions.php

    <?php function theme_name_custom_post_types() {

    	$labels = array(
    		'name' => 'PluralName',
    		'singular_name' => 'SingularName'
    	);

    	$args = array(
    		'labels' => $labels,
    		'description' => '',
    		'public' => true,
    		'show_ui' => true,
    		'has_archive' => false,
    		'show_in_menu' => true,
    		'exclude_from_search' => false,
    		'capability_type' => 'post',
    		'map_meta_cap' => true,
    		'hierarchical' => false,
    		'rewrite' => array( 'slug' => 'singularname', 'with_front' => true ),
    		'query_var' => true,

    		'taxonomies' => array( 'category', 'post_tag' )
    	);

    	register_post_type( 'singularname', $args );

    }

    add_action( 'init', 'theme_name_custom_post_types' ); ?>

## Custom post types categories and tags addition

    <?php function add_custom_types_to_tax( $query ) {

      if( is_category() || is_tag() && empty( $query->query_vars['suppress_filters'] ) ) {

        // Get all post types
        $post_types = get_post_types();

        $query->set( 'post_type', $post_types );
        return $query;

      }

    }

    add_filter( 'pre_get_posts', 'add_custom_types_to_tax' ); ?>

## Google fonts enqueued in functions.php

    <?php
      wp_enqueue_style( 'google_fonts_css', 'https://fonts.googleapis.com/css?family=Open+Sans:400,700' );
    ?>

## Heading based on what type of page is loaded (outside of WP loop)

    <h1><?php if ( is_category() ) { ?>
    <?php single_cat_title(); ?>
    <?php } elseif ( is_front_page() || is_home() ) { ?>
      The latest
    <?php } elseif ( is_page() || is_single() ) {
      the_title();
    } elseif ( is_tag() ) { ?>
      <?php single_tag_title( 'Tag: ' ); ?>
    <?php } ?></h1>

## Home page link with site name

    <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a>

## JS without jQuery enqueued in functions.php

    <?php
      wp_enqueue_script( 'script_js', get_template_directory_uri() . '/assets/js/script.min.js', array(), '', true );
    ?>

## Menu as displayed on template/theme file (Requires registration in functions.php)

    <?php wp_nav_menu(
      array(
      'container' => '',
      'menu_class' => 'nav-menu',
      'menu_id' => 'nav-menu',
      'theme_location' => 'nav_menu'
      )
    ); ?>

## OldIE enqueued in functions.php

    <?php
      wp_enqueue_script( 'oldie_js', get_template_directory_uri() . '/assets/js/oldie.min.js' );
      wp_script_add_data( 'oldie_js', 'conditional', 'lt IE 9' );
    ?>

## Pagination shows only if it exists (Requires pagination in functions.php)

    <?php if ( get_next_posts_link() || get_previous_posts_link() ) : ?>
      <ul class="pagination">
        <?php if ( get_next_posts_link() ) { ?>
        <li class="previous">
          <?php next_posts_link( 'Previous' ); ?>
        </li>
        <?php }
        if ( get_previous_posts_link() ) { ?>
        <li class="next">
          <?php previous_posts_link( 'Next' ); ?>
        </li>
        <?php } ?>
      </ul>
    <?php endif; ?>

## Template part include (Requires page: content-name.php)

    <?php get_template_part( 'content', 'name' ); ?>

## Year displayed

    <?php echo date( 'Y' ); ?>