<form action="<?php echo esc_url( home_url( '/' ) ); ?>" class="search-form" method="get" role="search">
  <label>
    <span class="screen-reader-text"><?php echo esc_html( 'Search for:' ); ?></span>
    <input class="search-field" name="s" placeholder="<?php echo esc_html( 'Search&hellip;' ); ?>" type="search" value="<?php echo get_search_query(); ?>" />
  </label>
  <button class="search-submit" type="submit"><span class="screen-reader-text"><?php echo esc_html( 'Search' ); ?></span></button>
</form><!-- /.search-form -->