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
        get_template_part( 'template-parts/content', 'oops' ); ?>
        <div class="404-widgets">
          <?php
          the_widget( 'WP_Widget_Recent_Posts' );
          the_widget( 'WP_Widget_Categories' );
          the_widget( 'WP_Widget_Tag_Cloud' );
          the_widget( 'WP_Widget_Archives', 'dropdown=1' );
          ?>
        </div>
      </main>
    </div>
    <?php
    get_sidebar(); ?>
  </div>
</div>
<?php
get_footer();