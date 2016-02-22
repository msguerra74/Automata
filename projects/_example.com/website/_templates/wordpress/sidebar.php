<?php
if ( is_active_sidebar( 'aside' ) ) : ?>
  <div class="aside-container">
    <aside class="aside" role="complementary">
      <div class="aside-widgets">
        <?php
        dynamic_sidebar( 'aside' ); ?>
      </div>
    </aside>
  </div>
<?php
endif;