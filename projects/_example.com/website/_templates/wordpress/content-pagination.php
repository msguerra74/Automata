<?php if ( get_next_posts_link() || get_previous_posts_link() ) : ?>
  <ul class="pagination">
    <?php if ( get_next_posts_link() ) { ?>
    <li class="previous">
      <?php next_posts_link( 'Previous' ); ?>
    </li>
    <?php }
    if ( get_previous_posts_link() ) { ?>
    <li class="next">
      <?php previous_posts_link( 'Next' ); ?>
    </li>
    <?php } ?>
  </ul>
<?php endif; ?>