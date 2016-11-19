<?php
get_header(); ?>
<div class="content-section" id="content-section" tabindex="0">
  <div class="content-container">
    <div class="content">
      <main class="main" role="main">
        <?php
        if( have_posts() ) :
          while ( have_posts() ) : the_post();
            get_template_part( 'template-parts/content', get_post_format() );
          endwhile;
          the_posts_navigation(
            array(
              'prev_text' => '&#10092; Older posts',
              'next_text' => 'Newer posts &#10093'
            )
          );
        else :
          get_template_part( 'template-parts/content', 'oops' );
        endif; ?>
      </main><!-- /.main -->
      <?php
      get_sidebar(); ?>
    </div><!-- /.content -->
  </div><!-- /.content-container -->
</div><!-- /.content-section -->
<?php
if ( is_active_sidebar( 'modules' ) ) :
  get_template_part( 'template-parts/content', 'modules' );
endif;
get_footer();