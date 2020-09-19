class User < ApplicationRecord
  has_many :favorite_user_images, -> { favorited }, class_name: 'UserImage'
  has_many :favorite_images, through: :favorite_user_images, source: :image
end
