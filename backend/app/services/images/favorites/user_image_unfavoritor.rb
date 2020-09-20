module Images
  module Favorites
    class UserImageUnfavoritor
      def self.unfavorite!(user_id:, external_id:)
        new(user_id: user_id, external_id: external_id).unfavorite!
      end

      def initialize(user_id:, external_id:)
        @user_id = user_id
        @external_id = external_id
      end

      def unfavorite!
        user.favorite_images.find_by(
          external_id: external_id
        ).destroy!
      end

      private

      def user
        User.find_by!(id: user_id)
      end

      attr_reader :user_id, :external_id
    end
  end
end
