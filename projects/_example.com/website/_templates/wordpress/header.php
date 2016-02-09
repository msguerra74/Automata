---
---

{% include 1-head.html %}
    <div class="header-container">
      <a class="skip-link screen-reader-text" href="#content"><?php echo esc_html( 'Skip to content' ); ?></a>
      <header class="header" role="banner">
        <div class="header-info">
          <div class="header-title">
            <?php
            if ( is_front_page() ) : ?>
              <h1><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
            <?php
            else : ?>
              <p><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
            <?php
            endif; ?>
          </div>
          <?php
          if ( get_bloginfo( 'description' ) ) : ?>
            <div class="header-description">
              <p><?php echo get_bloginfo( 'description' ); ?></p>
            </div>
          <?php
          endif; ?>
        </div>
      </header>
      <div class="nav-container">
        <nav class="nav" role="navigation">
          <div class="nav-toggle">
            <a href="#nav-menu"><?php echo esc_html( 'Menu' ); ?></a>
          </div>
          <?php
          wp_nav_menu(
            array(
              'container' => 'ul',
              'menu_class' => 'nav-menu',
              'menu_id' => 'nav-menu',
              'theme_location' => 'nav_menu'
            )
          ); ?>
        </nav>
      </div>
    </div>