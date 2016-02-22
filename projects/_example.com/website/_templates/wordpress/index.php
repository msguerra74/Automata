---
layout: wordpress
wordpress:
  feature: false
  sidebar: true
---

        <?php
        if( have_posts() ) :
          while ( have_posts() ) : the_post();
            get_template_part( 'template-parts/content', get_post_format() );
          endwhile;
          the_posts_navigation(
            array(
              'prev_text' => '&#10092; Older posts',
              'next_text' => 'Newer posts &#10093'
            )
          );
        else :
          get_template_part( 'template-parts/content', 'oops' );
        endif; ?>