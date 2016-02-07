<article class="post-list">
  <?php
  if ( has_post_thumbnail() ) :
    the_post_thumbnail();
  endif ?>
  <div class="post-list-info">
    <h2><a href="<?php echo esc_url( the_permalink() ); ?>" rel="home"><?php the_title(); ?></a></h2>
    <div class="post-info">
      <p class="post-date"><?php the_time( 'F j, Y' ); ?></p>
      <?php
      the_excerpt(); ?>
    </div>
  </div>
</article>