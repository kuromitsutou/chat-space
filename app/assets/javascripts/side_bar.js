$(document).on('turbolinks:load', function() {

  function hideSidebar(){
    $('.side-nav').addClass('hide');
    $('.fa-cog').hide();
    $('.fa-edit').hide();
    $('.user-info__user-name').hide();
    $('.member-group__group-name').hide();
    $('.member-group__group-last-message').hide();
    changeSidebar(60);
  }

  function showSidebar(){
    changeSidebar(300);
    $('.side-nav').removeClass('hide');
    $('.fa-cog').show();
    $('.fa-edit').show();
    $('.user-info__user-name').show();
    $('.member-group__group-name').show();
    $('.member-group__group-last-message').show();
  }

  function changeSidebar(sidebar_width){

    $('.side-nav').animate({
      width: sidebar_width.toString() + "px",
    }, 500);
    $('.user-info').animate({
      width: sidebar_width.toString() + "px",
    }, 500);
    $('.member-groups').animate({
      width: sidebar_width.toString() + "px",
    }, 500);
    $('.main-content').animate({
            'padding-left': sidebar_width.toString() + "px",
    }, 500);

    $('.header-group-info').css("width", "calc(100% - " + sidebar_width.toString() + "px");

    $('.footer-message-column__input-space').css(
      "width", "calc(100% - " + (sidebar_width + 180).toString() + "px");
  }

  $('.fa-bars').on('click', function(){
    if($('.side-nav').hasClass('hide')){
      showSidebar();
    }else{
      hideSidebar();
    }

  });
});