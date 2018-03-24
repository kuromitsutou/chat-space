$(function(){
  function buildHTML(message){
    var html = `<div class='group-message'>
                  <div class='group-message__user-name'>
                  ${ message.name }
                  </div>
                  <div class='group-message__post-date'>
                  ${ message.format_posted_time }
                  </div>
                  <div class='group-message__post-message'>
                  ${ message.body}
                  <img src="${ message.image }" alt="" />
                  </div>
                </div>`

    return html;
  }

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
      var html = buildHTML(data);
      $('.group-messages').append(html);
      $('.textbox').val('');
      $('html,body').animate({scrollTop: $('html,body').prop("scrollHeight")});
      $('.footer-message-column__send-button').prop('disabled',false);
    })
    .fail(function(response){
      alert('メッセージ送信失敗');
    });
  });
});