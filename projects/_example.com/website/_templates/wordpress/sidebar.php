<?php
if ( is_active_sidebar( 'aside-modules' ) ) : ?>
  <aside class="aside" role="complementary">
    <div class="aside-modules">
      <?php
      dynamic_sidebar( 'aside-modules' ); ?>
    </div><!-- /.aside-modules -->
  </aside><!-- /.aside -->
<?php
endif;