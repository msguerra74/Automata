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
              'prev_text' => 'Previous posts',
              'next_text' => 'Next posts'
            )
          );
        else :
          get_template_part( 'template-parts/content', 'oops' );
        endif; ?>