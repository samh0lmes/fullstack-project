class UserImage < ApplicationRecord
  belongs_to :image
  belongs_to :user

  scope :favorited, -> { where(favorited: true) }
end
