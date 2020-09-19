module External
  module Giphy
    class ImageSearcher
      GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs'
      IMAGE_SEARCH_ENDPOINT = '/search'

      def self.search_images!(search_term)
        new(search_term).search_images!
      end

      def initialize(search_term)
        @search_term = search_term
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
            id: image['id'],
            src: image['images']['fixed_width']['url'],
            title: image['title']
          }
        end
      end

      def full_url
        "https://api.giphy.com/v1/gifs/search?api_key=#{api_key}&q=#{search_term}"
      end

      def api_key
        ENV.fetch('GIPHY_API_KEY')
      end

      attr_reader :search_term
    end
  end
end
