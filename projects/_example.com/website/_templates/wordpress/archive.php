---
layout: wordpress
wordpress:
  feature: false
  sidebar: true
---

        <?php
        if( have_posts() ) :
          the_archive_title( '<h1>', '</h1>' );
          the_archive_description();
          while ( have_posts() ) : the_post();
            get_template_part( 'template-parts/content', get_post_format() );
          endwhile;
          the_posts_navigation();
        else :
          get_template_part( 'template-parts/content', 'oops' );
        endif; ?>