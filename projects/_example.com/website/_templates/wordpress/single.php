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
            get_template_part( 'template-parts/content', 'single' );
          endwhile;
          the_post_navigation(
            array(
              'prev_text' => '&#10092; Previous post',
              'next_text' => 'Next post &#10093;'
            )
          );
          if ( comments_open() || get_comments_number() ) :
            comments_template();
          endif;
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