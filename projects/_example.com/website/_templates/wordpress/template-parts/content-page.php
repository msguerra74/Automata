<header class="page-header">
  <?php
  the_title( '<h1>', '</h1>' ); ?>
</header><!-- /.page-header -->
<div class="page-content">
  <?php
  the_content(); ?>
</div><!-- /.page-content -->
<footer class="page-footer">
  <?php
  wp_link_pages( 'before=<p class="multi-page-navigation">Page &pagelink=<span> % </span>' ); ?>
  <p class="page-modified-date"><small><?php echo esc_html( 'Page last updated on' ) ?> <span><?php the_modified_date(); ?></span></small></p>
</footer><!-- /.page-footer -->
<?php
if ( is_active_sidebar( 'main-modules' ) ) : ?>
  <div class="main-modules">
    <?php
    dynamic_sidebar( 'main-modules' ); ?>
  </div><!-- /.main-modules -->
<?php
endif;