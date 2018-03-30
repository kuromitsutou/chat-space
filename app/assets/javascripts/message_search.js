$(document).on('turbolinks:load', function() {

  var group_messages_list = $('group-message');

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

  $('.fa-search-plus').on('click', function(){
    var search_filed = `<input id="user-search-field" type="text" name="keyword" size="38" placeholder="検索したいメッセージを入力してください">
                        <i class="fa fa-search"></i>
                        <i class="fa fa-search-minus"></i>`
    $('.fa-search-plus').before(search_filed);
    $('.fa-search-plus').hide();
    $('#user-search-field').css("font-size", "14px");
    $('#user-search-field').css("margin-left", "15px");
    group_messages_list = $('div.group-message');
  });

  $(document).on('click', '.fa-search-minus', function(){
    $('#user-search-field').remove();
    $('.fa-search').remove();
    $('.fa-search-minus').remove();
    $('.fa-search-plus').show();

    $('.group-messages').empty();
    $('.group-messages').append(group_messages_list);
  });

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
          var html = buildHTML(message);
          $('.group-messages').append(html);
        });
      }
    })
    .fail(function(response){
      alert('メッセージ検索に失敗しました');
    })
  });
});