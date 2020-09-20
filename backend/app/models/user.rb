class User < ApplicationRecord
  has_many :favorite_user_images, -> { favorited }, class_name: 'UserImage'
  has_many :favorite_images, through: :favorite_user_images, source: :image

  def mapped_favorite_images
    favorite_images.map do |image|
      {
        src: image.src,
        title: image.title,
        external_id: image.external_id,
        favorited: true
      }
    end
  end
end
