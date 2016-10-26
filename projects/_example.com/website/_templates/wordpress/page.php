<?php
get_header(); ?>
<div class="content-container" id="content-container" tabindex="0">
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
  </main>
  <?php
  get_sidebar(); ?>
</div>
<?php
get_footer();