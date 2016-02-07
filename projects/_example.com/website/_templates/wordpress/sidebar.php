<?php
if ( is_active_sidebar( 'aside' ) ) : ?>
  <aside class="aside" role="complementary">
    <?php
    dynamic_sidebar( 'aside' ); ?>
  </aside>
<?php
endif;