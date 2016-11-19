<?php
get_header(); ?>
<div class="content-section" id="content-section" tabindex="0">
  <div class="content-container">
    <div class="content">
      <main class="main" role="main">
        <?php
        if( have_posts() ) :
          while ( have_posts() ) : the_post();
            get_template_part( 'template-parts/content', 'page' );
          endwhile;
          if ( comments_open() || get_comments_number() ) :
            comments_template();
          endif;
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