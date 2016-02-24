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
      </main>
    </div>
    <?php
    get_sidebar(); ?>
  </div>
</div>
<?php
get_footer();