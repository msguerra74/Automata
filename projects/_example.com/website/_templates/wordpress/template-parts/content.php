<article class="post-excerpt">
  <?php
  if ( has_post_thumbnail() ) :
    the_post_thumbnail();
  endif ?>
  <div class="post-excerpt-info">
    <h2><a href="<?php echo esc_url( the_permalink() ); ?>" rel="home"><?php the_title(); ?></a></h2>
    <p class="post-excerpt-date"><?php the_time( 'F j, Y' ); ?></p>
    <?php
    the_excerpt(); ?>
  </div>
</article>