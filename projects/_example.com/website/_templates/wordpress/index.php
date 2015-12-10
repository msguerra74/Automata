<?php get_header(); ?>
<div class="content-container">
  <div class="content">
    <main class="main" role="main">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <!-- Content -->
    <?php endwhile;
      get_template_part( 'content', 'pagination' );
    else :
      get_template_part( 'content', 'oops' );
    endif; ?>
    </main>
    <?php get_sidebar(); ?>
  </div><!-- /.content -->
</div><!-- /.content-container -->
<?php get_footer(); ?>