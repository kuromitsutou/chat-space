$(document).on('turbolinks:load', function() {

  var group_messages_list = $('group-message');

  $('.fa-search-plus').on('click', function(){
    var search_icon = `<i class="fa fa-search"></i>
                        <i class="fa fa-search-minus"></i>`
    $('.fa-search-plus').before(search_icon);
    $('.fa-search-plus').hide();
    $('#user-search-field').hide().animate({width: 'toggle'}, {duration: 500});
    group_messages_list = $('div.group-message');
  });

  $(document).off('click', '.fa-search-minus');
  $(document).on('click', '.fa-search-minus', function(){
    $('#user-search-field').animate({width: 'toggle'}, {duration: 500})
    $('.fa-search').remove();
    $('.fa-search-minus').remove();
    $('.fa-search-plus').show();

    $('.group-messages').empty();
    $('.group-messages').append(group_messages_list);
    $('.group-messages').hide().animate({ opacity: 'show'}, { duration: 300, easing: 'swing'});
    $('#user-search-field').val("");
  });

  $(document).off('click', '.fa-search');
  $(document).on('click', '.fa-search', function(){
    var input = $('#user-search-field').val();

    $.ajax({
        type: 'GET',
        url: document.URL,
        data: { keyword: input },
        dataType: 'json'
    })
    .done(function(messages){
      $('.group-messages').empty();
      if(messages.length !== 0){
        messages.forEach(function(message){
          var html = CreatePostHTML(message);
          $('.group-messages').append(html);
          $('#message-' + message.id).hide().animate({ opacity: 'show'}, { duration: 300, easing: 'swing'});
        });
      }
    })
    .fail(function(response){
      alert('メッセージ検索に失敗しました');
    })
  });
});
