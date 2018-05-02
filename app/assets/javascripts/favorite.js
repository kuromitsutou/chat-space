$(document).on('turbolinks:load', function() {

  $(document).off('click','.fa-heart');
  $(document).on('click', '.fa-heart', function(){
    $(this).prop('disabled', true);

    var favorite_id = $(this).attr('id').match(/\d+/);
    var message_id = $(this).parent().parent().attr('id').match(/\d+/);
    var url = document.URL + '/' + message_id + '/favorites/' + favorite_id;

    $.ajax({
      type: 'DELETE',
      url: url,
      dataType: 'json'
    })
    .done(function(data){
      if(data.success){

        var html = `<div class="i fa fa-heart-o"> ${ data.favorite_count }</div>`;
        var group_message = $('#message-' + message_id);
        var favorite = $('#favorite-' + favorite_id);

        $(html).insertBefore(favorite);
        favorite.remove();
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

    var message_id = $(this).parent().parent().attr('id').match(/\d+/);
    var url = document.URL + '/' + message_id + '/favorites';

    $.ajax({
      type: 'POST',
      url: url,
      dataType: 'json'
    })
    .done(function(data){
      if(data.success){

        var html = `<div id="favorite-${ data.id }" class="i fa fa-heart"> ${ data.favorite_count }</div>`;
        var group_message = $('#message-' + message_id);
        var favorite = group_message.find('.fa-heart-o');

        $(html).insertBefore(favorite);
        favorite.remove();

        $('#favorite-' + data.id).animate({'font-size' : 20}, 400);
        $('#favorite-' + data.id).animate({'font-size' : 15}, 200);
      }else{
        alert('お気に入り登録失敗');
      }
    })
    .fail(function(response){
      alert('お気に入り登録失敗');
    })
  });

});
