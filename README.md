# DB設計

## messages table
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- has_many   :favorites

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :messages
- has_many :users, through: :members

## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index: true|
|email|string|null: false|

### Association
- has_many :members
- has_many :messages
- has_many :favorites
- has_many :groups, through: :members

## favorites table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, add_index: true|
|message_id|integer|null: false, add_index: true|

### Association
- belongs_to :message
- belongs_to :user
