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
    </div>
    <?php
    get_sidebar(); ?>
  </div>
</div>
<?php
get_footer();