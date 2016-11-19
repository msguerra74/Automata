<?php
get_header(); ?>
<div class="content-section" id="content-section" tabindex="0">
  <div class="content-container">
    <div class="content">
      <main class="main" role="main">
        <?php
        if( have_posts() ) : ?>
          <div class="page-header">
            <h1><?php echo esc_html( 'Search results for: '); ?><span><?php the_search_query(); ?></span></h1>
          </div><!-- /.page-header -->
          <?php
          while ( have_posts() ) : the_post();
            get_template_part( 'template-parts/content', get_post_format() );
          endwhile;
          the_posts_navigation();
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