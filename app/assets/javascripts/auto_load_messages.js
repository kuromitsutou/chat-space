$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    var html = `<div id='message-${ message.id }', class='group-message'>
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

  setInterval(function(){
    if(document.URL.match(/groups\/\d+\/messages/) !== null){
      var exists_message_ids = [];
      $('div.group-message').each(function(){
        exists_message_ids.push($(this).attr('id').match(/\d+/));
      });
      var max_message_id = Math.max.apply(null, exists_message_ids);

      $.ajax({
        url: document.URL,
        type: 'GET',
        dataType: 'json',
        data: { max_message_id: max_message_id }
      })
      .done(function(messages){
        messages.forEach(function(message){
          var html = buildHTML(message);
          $('.group-messages').append(html);
          $('html,body').animate({scrollTop: $('html,body').prop("scrollHeight")});
        });
      })
    }

  }, 5000);

});