json.id @message.id
json.name @message.user.name
json.format_posted_time @message.format_posted_time
json.body @message.body.present? ? @message.body : " "
json.image @message.image.present? ? @message.image.url : " "
