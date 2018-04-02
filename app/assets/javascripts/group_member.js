$(document).on('turbolinks:load', function() {

  var user_list = $("#chat-group-users");

  function appendUser(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    user_list.append(html);
  }

  $(document).off('click', '.chat-group-user__btn--add');
  $(document).on('click', '.chat-group-user__btn--add', function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    $(this).parent().remove();
    appendUser(user_id, user_name)
  });

  $(document).off('click', '.chat-group-user__btn--remove');
  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
});