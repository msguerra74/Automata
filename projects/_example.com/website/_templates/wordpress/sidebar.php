<?php
if ( is_active_sidebar( 'aside' ) ) : ?>
  <aside class="aside" role="complementary">
    <div class="aside-widgets">
      <?php
      dynamic_sidebar( 'aside' ); ?>
    </div>
  </aside>
<?php
endif;