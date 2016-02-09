<article>
  <?php
  the_title( '<h1>', '</h1>' ); ?>
  <header class="post-header">
    <p class="post-date"><?php the_time( 'F j, Y' ); ?></p>
  </header>
  <?php
  the_content(); ?>
  <footer class="post-footer">
    <?php
    the_category();
    the_tags( '<ul class="post-tags"><li>', '</li><li>', '</li></ul>' ); ?>
  </footer>
</article>