---
layout: wordpress
wordpress:
  feature: true
  sidebar: true
---

        <?php
        if( have_posts() ) :
          while ( have_posts() ) : the_post();
            get_template_part( 'template-parts/content', 'page' );
          endwhile;
          if ( comments_open() || get_comments_number() ) :
            comments_template();
          endif;
        else :
          get_template_part( 'template-parts/content', 'oops' );
        endif; ?>