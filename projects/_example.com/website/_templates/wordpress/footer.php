---
---

    <div class="footer-container">
      <footer class="footer" role="contentinfo">
        <div class="footer-info">
          <?php
          wp_nav_menu(
            array(
              'container' => 'ul',
              'menu_class' => 'footer-nav-menu',
              'theme_location' => 'footer_nav_menu'
            )
          ); ?>
          <?php
          wp_nav_menu(
            array(
              'container' => 'ul',
              'menu_class' => 'social-nav-menu',
              'theme_location' => 'social_nav_menu'
            )
          ); ?>
          <p><?php echo esc_html( '&copy; ' ), date( 'Y' ); ?> <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
        </div>
      </footer>
    </div>
{% include 5-foot.html %}