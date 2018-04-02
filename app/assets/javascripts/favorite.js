$(document).on('turbolinks:load', function() {

  $(document).off('click','.fa-heart');
  $(document).on('click', '.fa-heart', function(){
    $(this).prop('disabled', true);

    var favorite_id = $(this).attr('id').match(/\d+/);
    var message_id = $(this).parent().attr('id').match(/\d+/);
    var url = document.URL + '/' + message_id + '/favorites/' + favorite_id;

    $.ajax({
      type: 'DELETE',
      url: url,
      dataType: 'json'
    })
    .done(function(data){
      if(data.success){
        var favorite = $('#favorite-' + favorite_id);
        favorite.remove();
        var group_message = $('#message-' + message_id);
        group_message.append(`<div class="i fa fa-heart-o"> ${ data.favorite_count }</div>`);
      }else{
        alert('お気に入り取消失敗');
      }
    })
    .fail(function(response){
      alert('お気に入り取消失敗');
    })
  });

  $(document).off('click','.fa-heart-o');
  $(document).on('click', '.fa-heart-o', function(){
    $(this).prop('disabled', true);

    var message_id = $(this).parent().attr('id').match(/\d+/);
    var url = document.URL + '/' + message_id + '/favorites';

    $.ajax({
      type: 'POST',
      url: url,
      dataType: 'json'
    })
    .done(function(data){
      if(data.success){
        var group_message = $('#message-' + message_id);
        group_message.append(`<div id="favorite-${ data.id }" class="i fa fa-heart"> ${ data.favorite_count }</div>`);
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
