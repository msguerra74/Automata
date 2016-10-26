<?php
get_header(); ?>
<div class="content-container" id="content-container" tabindex="0">
  <main class="main" role="main">
    <?php
    if( have_posts() ) : ?>
      <header class="page-header">
        <?php
        the_archive_title( '<h1>', '</h1>' );
        the_archive_description(); ?>
      </header>
      <?php
      while ( have_posts() ) : the_post();
        get_template_part( 'template-parts/content', get_post_format() );
      endwhile;
      the_posts_navigation();
    else :
      get_template_part( 'template-parts/content', 'oops' );
    endif; ?>
  </main>
  <?php
  get_sidebar(); ?>
</div>
<?php
get_footer();