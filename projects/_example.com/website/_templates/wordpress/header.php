---
---

{% include 1-head.html %}
    <a href="#content-container" class="skip-link screen-reader-text"><?php echo esc_html( 'Skip to content' ); ?></a>
    <div class="header-container">
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
      <?php
      if ( has_nav_menu( 'nav_menu' ) ) : ?>
        <nav class="nav" role="navigation">
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
      <?php
      endif; ?>
    </div>
    <div class="nav-toggle">
      <a href="#nav-menu"><?php echo esc_html( 'Menu' ); ?></a>
    </div>
    <?php
    if ( has_post_thumbnail() ) :
      get_template_part( 'template-parts/content', 'feature' );
    endif; ?>