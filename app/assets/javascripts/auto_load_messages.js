$(document).on('turbolinks:load', function() {

  setInterval(function(){
    if(document.URL.match(/groups\/\d+\/messages/) !== null && !$('.fa-search').size()){

      var exists_message_ids = [];
      var max_message_id = 0;
      if($('.group-message').length !== 0){
        $('.group-message').each(function(){
          exists_message_ids.push($(this).children('.group-message__post-message').attr('id').match(/\d+/));
        });
        max_message_id = Math.max.apply(null, exists_message_ids);
      }

      $.ajax({
        url: document.URL,
        type: 'GET',
        dataType: 'json',
        data: { max_message_id: max_message_id }
      })
      .done(function(messages){
        if(messages.length !== 0){
          messages.forEach(function(message){
            var html = CreatePostHTML(message);
            $('.group-messages').append(html);
            $('#message-' + message.id).hide().animate({ opacity: 'show'}, { duration: 800, easing: 'swing'});
            $('html,body').animate({scrollTop: $('html,body').prop("scrollHeight")});
          });
        }
      })
    }

  }, 5000);

});
