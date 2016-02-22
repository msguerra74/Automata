<article class="post-excerpt">
  <?php
  if ( has_post_thumbnail() ) :
    the_post_thumbnail();
  endif ?>
  <div class="post-excerpt-info">
    <h2><a href="<?php echo esc_url( the_permalink() ); ?>" rel="home"><?php the_title(); ?></a></h2>
    <div class="post-meta">
      <time class="post-date" datetime="<?php the_time( 'Y-j-m' ); ?>"><?php the_time( 'F j, Y' ); ?></time>
    </div>
    <?php
    the_excerpt(); ?>
  </div>
</article>