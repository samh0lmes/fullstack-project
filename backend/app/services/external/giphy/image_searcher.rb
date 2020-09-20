module External
  module Giphy
    class ImageSearcher
      GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs'
      IMAGE_SEARCH_ENDPOINT = '/search'

      def self.search_images!(search_term:, user_id:)
        new(search_term: search_term, user_id: user_id).search_images!
      end

      def initialize(search_term:, user_id:)
        @search_term = search_term
        @user_id = user_id
      end

      def search_images!
        images_response = RestClient.get(full_url)

        full_images = JSON.parse(images_response.body)['data']

        map_images(full_images)
      end

      private

      def map_images(full_images)
        full_images.map do |image|
          {
            external_id: image['id'],
            src: image['images']['fixed_width']['url'],
            title: image['title'],
            favorited: favorited_images_external_ids.include?(image['id'])
          }
        end
      end

      def favorited_images_external_ids
        @favorited_images_external_ids ||= user.favorite_images.pluck(:external_id)
      end

      def user
        User.find_by!(id: user_id)
      end

      def full_url
        "https://api.giphy.com/v1/gifs/search?api_key=#{api_key}&q=#{search_term}"
      end

      def api_key
        ENV.fetch('GIPHY_API_KEY')
      end

      attr_reader :search_term, :user_id
    end
  end
end
