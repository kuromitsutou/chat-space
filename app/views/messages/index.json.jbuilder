json.array! @messages do |message|
  json.id message.id
  json.name message.user.name
  json.format_posted_time message.format_posted_time
  json.body message.body.present? ? message.body : " "
  json.image message.image.present? ? message.image.url : " "
  json.favorite_count message.favorite_count
  json.favorite_class message.users_favorite_id(@current_user_id) == 0 ? "fa-heart-o" : "fa-heart"
end
