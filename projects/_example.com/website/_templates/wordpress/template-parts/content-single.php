<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
  <header class="post-header">
    <?php
    the_title( '<h1>', '</h1>' ); ?>
    <div class="post-meta">
      <time class="post-date" datetime="<?php the_time( 'Y-j-m' ); ?>"><?php the_time( 'F j, Y' ); ?></time>
    </div><!-- /.post-meta -->
  </header><!-- /.post-header -->
  <div class="post-content">
    <?php
    the_content(); ?>
  </div><!-- /.post-content -->
  <footer class="post-footer">
    <?php
    wp_link_pages( 'before=<p class="multi-page-navigation">Page &pagelink=<span> % </span>' ); ?>
    <h3><?php echo esc_html( 'Post categorization'); ?></h3>
    <?php
    the_category();
    the_tags( '<ul class="post-tags"><li>', '</li><li>', '</li></ul>' ); ?>
    <p class="post-modified-date"><small><?php echo esc_html( 'Post last updated on' ) ?> <span><?php the_modified_date(); ?></span></small></p>
  </footer><!-- /.post-footer -->
</article>
<?php
if ( is_active_sidebar( 'main-modules' ) ) : ?>
  <div class="main-modules">
    <?php
    dynamic_sidebar( 'main-modules' ); ?>
  </div><!-- /.main-modules -->
<?php
endif;