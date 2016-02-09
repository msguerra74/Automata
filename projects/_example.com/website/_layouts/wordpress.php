<?php
get_header(); ?>
<div class="content-container">{% if page.wordpress.feature %}
  <?php
  if ( has_post_thumbnail() ) :
    get_template_part( 'template-parts/content', 'feature' );
  endif; ?>{% endif %}
  <div class="content" id="content">
    <div class="main-container">
      <main class="main" role="main">
{{ content }}
      </main>
    </div>{% if page.wordpress.sidebar %}
    <?php
    get_sidebar(); ?>{% endif %}
  </div>
</div>
<?php
get_footer();