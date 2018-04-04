if @save_success
  json.id @message.id
  json.name @message.user.name
  json.format_posted_time @message.format_posted_time
  json.body @message.body.present? ? @message.body : ""
  json.image @message.image.present? ? @message.image.url : ""
end
json.favorite_count 0
json.favorite_class "fa-heart-o"
json.message_trash_class "fa-trash"
json.save_success @save_success
json.flash_message @flash_message
