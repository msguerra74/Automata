<?php
get_header(); ?>
<div class="content-section" id="content-section" tabindex="0">
  <div class="content-container">
    <div class="content">
      <main class="main" role="main">
        <?php
        get_template_part( 'template-parts/content', 'oops' ); ?>
        <div class="oops-widgets">
          <?php
          the_widget( 'WP_Widget_Recent_Posts' );
          the_widget( 'WP_Widget_Categories' );
          the_widget( 'WP_Widget_Tag_Cloud' );
          the_widget( 'WP_Widget_Archives', 'dropdown=1' ); ?>
        </div><!-- /.404-widgets -->
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