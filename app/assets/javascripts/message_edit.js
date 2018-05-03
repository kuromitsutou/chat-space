function CreateEditHTML(message_id, url, text){
  var html = `<div class="group-message__edit-form">
                <form id="edit_message-${ message_id }" class="edit_message" enctype="multipart/form-data" action="${ url }" accept-charset="UTF-8" method="patch">
                  <input class="group-message__edit-form__input-space textbox" placeholder="type a message" type="text" name="message[body]" id="message_body" value="${ text }">
                  </label><input type="submit" name="commit" value="Send" class="group-message__edit-form__send-button" data-disable-with="Send">
                </form>
              </div>`;
    return html;
}

$(document).on('turbolinks:load', function() {

  $(document).off('click','.fa-message-edit');
  $(document).on('click', '.fa-message-edit', function(){
    if($(this).hasClass("active")){
      $(this).removeClass("active");

      var message_id = $(this).parent().parent().attr('id').match(/\d+/);
      $('#edit_message-' + message_id).parent().animate({ opacity: 'hide'}, { duration: 200, easing: 'swing'});
      $('#edit_message-' + message_id).remove();

    }else{
      $(this).addClass("active");

      var message_id = $(this).parent().parent().attr('id').match(/\d+/);
      var url = document.URL + '/' + message_id;
      var post_message = $("#message-" + message_id).parent();
      var text = post_message.find('.group-message__post-message__message').text();

      var html = CreateEditHTML(message_id, url, text);
      post_message.append(html);
      $('#edit_message-' + message_id).hide().animate({ opacity: 'show'}, { duration: 200, easing: 'swing'});
    }
  });

  $(document).on('submit', '.edit_message');
  $(document).on('submit', '.edit_message', function(e){
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'PATCH',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      HideNotification();
      if(data.update_success){
        var group_message = $('#message-' + data.id);
        group_message.find('.group-message__post-message__message').text(data.body);
        $('#edit_message-' + data.id).parent().animate({ opacity: 'hide'}, { duration: 200, easing: 'swing'});
        $('#message-' + data.id).hide().animate({ opacity: 'show'}, { duration: 500, easing: 'swing'});
      }
      ShowNotification(data.update_success ? "notice" : "alert" , data.flash_message);
    })
    .fail(function(response){
      alert('メッセージ編集失敗');
    });

  });
});
