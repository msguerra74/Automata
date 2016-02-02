<?php
if ( is_single() ) { ?>
  <article>
    <?php the_content(); ?>
  </article>
<?php } else {
  the_content();
}