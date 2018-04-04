$(document).on('turbolinks:load', function() {

  $(document).off('click','.fa-trash');
  $(document).on('click', '.fa-trash', function(){
    $(this).prop('disabled', true);
    if(!confirm('本当に削除しますか？')){
      $(this).prop('disabled', false);
      return;
    }
    var message_id = $(this).parent().attr('id').match(/\d+/);
    var url = document.URL + '/' + message_id;

    $.ajax({
      url: url,
      type: 'DELETE',
      dataType: 'json'
    })
    .done(function(data){
      HideNotification();
      if(data.destroy_success){
        var group_message = $('#message-' + message_id);
        group_message.animate({ opacity: 'hide'}, { duration: 500, easing: 'swing'});
      }
      ShowNotification(data.destroy_success ? "notice" : "alert" , data.flash_message);
    })
    .fail(function(response){
      alert('メッセージ削除失敗');
    });

    $(this).prop('disabled', false);
  });
});
