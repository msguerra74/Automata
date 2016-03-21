<header class="page-header">
  <?php
  the_title( '<h1>', '</h1>' ); ?>
</header>
<?php
if ( has_post_thumbnail() ) :
  get_template_part( 'template-parts/content', 'feature' );
endif; ?>
<div class="page-content">
  <?php
  the_content(); ?>
</div>
<footer class="page-footer">
  <?php
  wp_link_pages( 'before=<p class="multi-page-navigation">Page &pagelink=<span> % </span>' ); ?>
  <p class="page-modified-date"><small><?php echo esc_html( 'Page last updated on' ) ?> <span><?php the_modified_date(); ?></span></small></p>
</footer>