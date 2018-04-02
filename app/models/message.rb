class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many   :favorites

  validates :body, presence: true, unless: :image?
  mount_uploader  :image, ImageUploader

  def format_posted_time
    created_at.strftime("%Y年 %m月 %d日, %H時 %M分")
  end

  def favorite_count
    self.favorites.present? ? self.favorites.count : 0
  end

  def users_favorite_id(user_id)
    users_favorite = self.favorites.find_by(user_id: user_id)
    users_favorite.present? ? users_favorite.id : 0
  end
end
