if @update_success
  json.id @message.id
  json.body @message.body.present? ? @message.body : " "
end
json.update_success @update_success
json.flash_message @flash_message
