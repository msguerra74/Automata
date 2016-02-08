<?php
if ( is_active_sidebar( 'aside' ) ) : ?>
  <div class="aside-container">
    <aside class="aside" role="complementary">
      <?php
      dynamic_sidebar( 'aside' ); ?>
    </aside>
  </div>
<?php
endif;