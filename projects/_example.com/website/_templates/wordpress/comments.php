<section class="comments">
  <?php
  if ( have_comments() ) : ?>
  <h2>
    <?php
    $comments_number = get_comments_number();
    if ( $comments_number == 1 ) :
      echo esc_html( 'One comment for: ' ), the_title( '<span>', '</span>');
    else :
      echo esc_html( $comments_number . ' comments for: ' ), the_title( '<span>', '</span>');
    endif; ?>
  </h2>
  <ol class="comment-list">
    <?php
    wp_list_comments(
      array(
        'style' => 'ol',
        'short_ping' => true,
        'avatar_size' => 72
      )
    ); ?>
  </ol>
  <?php
  the_comments_navigation(
    array(
      'prev_text' => '&#10092; Older comments',
      'next_text' => 'Newer comments &#10093;'
    )
  );
  endif;
  if ( ! comments_open() || ! comments_open() && get_comments_number() ) : ?>
    <div class="comments-closed">
      <p><?php echo esc_html( 'Comments are currently closed' ); ?></p>
    </div>
  <?php
  endif;
  comment_form(
    array(
      'title_reply_before' => '<h2 class="comment-reply-title">',
      'title_reply_after' => '</h2>'
    )
  ); ?>
</section>