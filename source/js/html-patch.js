(function($){
  // Remove extra main nav wrap
  $('.main-nav-list > li').unwrap();

  // Highlight current nav item
  $('#main-nav > li > .main-nav-list-link').each(function(){
  	if($('.page-title-link').length > 0){
      if($(this).html().toUpperCase() == $('.page-title-link').html().toUpperCase()){
        $(this).addClass('current');
      } else if ($(this).attr('href') == $('.page-title-link').attr('data-url')){
        $(this).addClass('current');
      }
    }
  });

  // Sidebar expend
  $('#sidebar .sidebar-toggle').click(function(){
    if($('#sidebar').hasClass('expend'))
      $('#sidebar').removeClass('expend');
    else
      $('#sidebar').addClass('expend');
  });

  // Set thumbnail height
  function setThumbnailHeight(){
    var width = $('.article-summary .thumbnail').width();
    var height = 245 * width / 520;
    $('.article-summary .thumbnail').height(height);
  }
  setThumbnailHeight();

  // Auto hide main nav menus
  function autoHideMenus(){
    var max_width = $('.nav-container-inner').width() - 10;
    var main_nav_width = $('#main-nav').width();
    var sub_nav_width = $('#sub-nav').width();
    if(main_nav_width + sub_nav_width > max_width){
      // If more link not exists
      if($('.main-nav-more').length == 0){
        $('<li class="main-nav-list-item top-level-menu main-nav-more">\
          <a class="main-nav-list-link" href="javascript:;">More</a>\
          <ul class="main-nav-list-child">\
          </ul></li>').appendTo($('#main-nav'));
        // Bind hover event
        $('.main-nav-more').hover(
          function(){
            if($(window).width() < 480) return;
            $(this).children('.main-nav-list-child').slideDown('fast');
          },
          function(){
            if($(window).width() < 480) return;
            $(this).children('.main-nav-list-child').slideUp('fast');
          }
        );
      }
      var child_count = $('#main-nav').children().length;
      for(var i = child_count - 2; i >= 0; i--){
        var element = $('#main-nav').children().eq(i);
        if(main_nav_width + sub_nav_width > max_width){
          element.prependTo($('.main-nav-more > ul'));
          main_nav_width = $('#main-nav').width();
        }else{
          return;
        }
      }
    }
    // Nav bar is wide enough
    if($('.main-nav-more').length > 0){
      $('.main-nav-more > ul').children().appendTo($('#main-nav'));
      $('.main-nav-more').remove();
    }
  }
  autoHideMenus();

  // Fold second-level menu
  $('.main-nav-list-item').hover(
    function(){
      if($(window).width() < 480) return;
      $(this).children('.main-nav-list-child').slideDown('fast');
    },
    function(){
      if($(window).width() < 480) return;
      $(this).children('.main-nav-list-child').slideUp('fast');
    }
  );

  // Add second-level menu mark
  $('.main-nav-list-item').each(function(){
    if($(this).find('.main-nav-list-child').length > 0){
      $(this).addClass('top-level-menu');
    }
  });

  // Image scroll loading
  $('.main-body-content img').each(function() {
    $(this).attr('data-url', $(this).attr('src'));
    $(this).removeAttr('src');
    $(this).addClass('scrollLoading');
    $(this).wrap('<div class="img-wrap"></div>');
  });
  function setScrollLoading(){
    $('.scrollLoading').scrollLoading();
    for(var i = 0; i < $('.scrollLoading').length; i++){
      if($('.scrollLoading')[i].complete){
        $('.scrollLoading').eq(i).unwrap();
      } else {
        $('.scrollLoading').eq(i).load(function(){
          $(this).unwrap();
        })
      }
    }
  }
  setScrollLoading();

  // Article summary height fix
  // function articleHeightFix(){
  //   if($(window).width() < 480) return;
  //   for(var i = 0; i <= $('.article-summary').length / 2; i++){
  //     if($('.article-summary').eq(i*2).height() > $('.article-summary').eq(i*2+1).height()){
  //       $('.article-summary').eq(i*2+1).height($('.article-summary').eq(i*2).height());
  //     } else {
  //       $('.article-summary').eq(i*2).height($('.article-summary').eq(i*2+1).height());
  //     }
  //   }
  // }
  // setTimeout(articleHeightFix, 100);

  // Fix sidebar thumbnail image size
  for(var i = 0; i < $('#recent-post .thumbnail-image').length; i++){
    if($('#recent-post .thumbnail-image')[i].complete){
      $('#recent-post .thumbnail-image').eq(i).VMiddleImg();
    } else {
      $('#recent-post .thumbnail-image').eq(i).load(function(){
        $(this).VMiddleImg();
      })
    }
  }

  $(window).resize(function() {
    setThumbnailHeight();
    autoHideMenus();
    // articleHeightFix();
  });

})(jQuery);