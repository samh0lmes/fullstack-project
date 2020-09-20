module Images
  module Favorites
    class UserImageFavoritor
      def self.favorite!(user_id:, image:)
        new(user_id: user_id, image: image).favorite!
      end

      def initialize(user_id:, image:)
        @user_id = user_id
        @external_id = image[:external_id]
        @src = image[:src]
        @title = image[:title]
      end

      def favorite!
        user.favorite_images.find_or_create_by!(
          external_id: external_id,
          src: src,
          title: title
        )
      end

      private

      def user
        User.find_by!(id: user_id)
      end

      attr_reader :user_id, :external_id, :src, :title
    end
  end
end
