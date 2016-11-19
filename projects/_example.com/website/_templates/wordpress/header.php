---
---

{% include 1-head.html %}
    <a href="#content-section" class="skip-link screen-reader-text"><?php echo esc_html( 'Skip to content' ); ?></a>
    <header class="header-section" role="banner">
      <?php
      if ( has_nav_menu( 'header_top_nav_menu' ) ) : ?>
        <div class="header-top-nav-container">
          <nav class="header-top-nav">
            <?php
            wp_nav_menu(
              array(
                'container' => 'ul',
                'menu_class' => 'header-top-nav-menu',
                'menu_id' => 'header-top-nav-menu',
                'theme_location' => 'header_top_nav_menu'
              )
            ); ?>
          </nav><!-- /.header-top-nav -->
        </div><!-- /.header-top-nav-container -->
      <?php
      endif; ?>
      <div class="header-container">
        <div class="header">
          <?php
          if ( has_nav_menu( 'header_nav_menu' ) ) : ?>
            <div class="header-nav-toggle">
              <a href="#header-nav-menu"><?php echo esc_html( 'Menu' ); ?></a>
            </div><!-- /.header-nav-toggle -->
          <?php
          endif; ?>
          <div class="header-info">
            <div class="header-info-title">
              <?php
              if ( is_front_page() ) : ?>
                <h1><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
              <?php
              else : ?>
                <p><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
              <?php
              endif; ?>
            </div><!-- /.header-info-title -->
            <?php
            if ( get_bloginfo( 'description' ) ) : ?>
              <div class="header-info-description">
                <p><?php echo get_bloginfo( 'description' ); ?></p>
              </div><!-- /.header-info-description -->
            <?php
            endif; ?>
          </div><!-- /.header-info -->
          <?php
          if ( is_active_sidebar( 'header-modules' ) ) : ?>
            <div class="header-modules">
              <?php
              dynamic_sidebar( 'header-modules' ); ?>
            </div><!-- /.header-modules -->
          <?php
          endif; ?>
        </div><!-- /.header -->
      </div><!-- /.header-container -->
      <?php
      if ( has_nav_menu( 'header_nav_menu' ) ) : ?>
        <div class="header-nav-container">
          <nav class="header-nav" role="navigation">
            <?php
            wp_nav_menu(
              array(
                'container' => 'ul',
                'menu_class' => 'header-nav-menu',
                'menu_id' => 'header-nav-menu',
                'theme_location' => 'header_nav_menu'
              )
            ); ?>
          </nav><!-- /.header-nav -->
        </div><!-- /.header-nav-container -->
      <?php
      endif; ?>
    </header><!-- /.header-section -->
    <?php
    if ( has_post_thumbnail() && is_singular() ) :
      get_template_part( 'template-parts/content', 'feature' );
    endif; ?>