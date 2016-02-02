<?php get_header(); ?>
<div class="content-container">
  <div class="content">
    <main class="main" role="main">
      <?php
      if ( have_posts() ) :
        while ( have_posts() ) : the_post();
          get_template_part( 'template-parts/content', get_post_format() );
        endwhile;
        the_posts_navigation();
      else :
        get_template_part( 'template-parts/content', 'none' );
      endif; ?>
    </main>
    <?php get_sidebar(); ?>
  </div>
</div>
<?php get_footer();