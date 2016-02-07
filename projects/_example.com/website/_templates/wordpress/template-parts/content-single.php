<article>
  <?php
  the_title( '<h1>', '</h1>' ); ?>
  <div class="post-info">
    <p class="post-date"><?php the_time( 'F j, Y' ); ?></p>
    <?php
    the_category();
    the_tags( '<ul class="post-tags"><li>', '</li><li>', '</li></ul>' ); ?>
  </div>
  <?php
  the_content(); ?>
</article>