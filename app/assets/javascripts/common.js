function CreatePostHTML(message){
  var html = `<div class="group-message">
                <div class="group-message__user-name">
                ${ message.name }
                </div>
                <div class="group-message__post-message my-message" id="message-${ message.id }">
                  <div class="group-message__post-message__image">
                  <img src="${ message.image }" height="128" alt="" />
                  </div>
                  <div class="group-message__post-message__message">${ message.body }</div>
                  <div class="group-message__post-message__post-date">
                  ${ message.format_posted_time }
                  </div>
                  <div class="group-message__post-message__menu">
                    <div class="i fa ${ message.favorite_class }"> ${ message.favorite_count }</div>
                    <div class="i fa ${ message.message_edit_class }"></div>
                    <div class="i fa ${ message.message_trash_class }"></div>
                  </div>
                </div>
              </div>`;

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
