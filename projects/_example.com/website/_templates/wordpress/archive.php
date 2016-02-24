<?php
get_header(); ?>
<div class="content-container">
  <?php
  if ( has_post_thumbnail() ) :
    get_template_part( 'template-parts/content', 'feature' );
  endif; ?>
  <div class="content" id="content">
    <div class="main-container">
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
    </div>
    <?php
    get_sidebar(); ?>
  </div>
</div>
<?php
get_footer();