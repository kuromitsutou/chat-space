$(document).on('turbolinks:load', function() {

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      HideNotification();
      if(data.save_success){
        var html = buildHTML(data);
        $('.group-messages').append(html);
        $('.textbox').val('');
        $('.image').val('');
        $('html,body').animate({scrollTop: $('html,body').prop("scrollHeight")});
      }
      ShowNotification(data.save_success ? "notice" : "alert" , data.flash_message);
      $('.footer-message-column__send-button').prop('disabled',false);
    })
    .fail(function(response){
      alert('メッセージ送信失敗');
    });
  });
});
