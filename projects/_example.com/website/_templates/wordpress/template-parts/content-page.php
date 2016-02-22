<header class="page-header">
  <?php
  the_title( '<h1>', '</h1>' ); ?>
</header>
<?php
if ( has_post_thumbnail() ) :
  get_template_part( 'template-parts/content', 'feature' );
endif;
the_content();