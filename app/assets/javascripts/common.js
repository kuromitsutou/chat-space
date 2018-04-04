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
                <div class="i fa ${ message.favorite_class }"> ${ message.favorite_count }</div>
              </div>`

  return html;
}

function ShowNotification(type, message){
  var html = `<div class="${ type }">${ message }</div>`;
  $('.notification').append(html);
  $('.main-content').css('padding-top', $('.notification').height());
}

function HideNotification(){
  $('.notification').empty();
  $('.main-content').css('padding-top', '0');
}
