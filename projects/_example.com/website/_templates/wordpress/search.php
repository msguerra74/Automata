<?php
get_header(); ?>
<div class="content-container" id="content-container" tabindex="0">
  <main class="main" role="main">
    <?php
    if( have_posts() ) : ?>
      <div class="page-header">
        <h1><?php echo esc_html( 'Search results for: '); ?><span><?php the_search_query(); ?></span></h1>
      </div>
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