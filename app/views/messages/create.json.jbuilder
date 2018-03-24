json.name @message.user.name
json.format_posted_time @message.format_posted_time
if @message.body.present?
  json.body @message.body
else
  json.body ' '
end
if @message.image.present?
  json.image @message.image.url
else
  json.image ' '
end
