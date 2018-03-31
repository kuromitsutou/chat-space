$(document).on('turbolinks:load', function() {

  $('.fa-heart').on('click', function(){

  });

  $('.fa-heart-o').on('click', function(){
    var message_id = $(this).parent().attr('id').match(/\d+/);
    var url = document.URL + '/' + message_id + '/favorites';

    $.ajax({
      type: 'POST',
      url: url,
      dataType: 'json'
    })
    .done(function(data){
      if(data.success){
        var group_message = $('#message-' + message_id.toString());
        group_message.append(`<div class="i fa fa-heart">${ data.favorite_count }</div>`)
        group_message.children('.fa-heart-o').remove();
      }else{
        alert('お気に入り登録失敗');
      }
    })
    .fail(function(response){
      alert('お気に入り登録失敗');
    })
  });
});