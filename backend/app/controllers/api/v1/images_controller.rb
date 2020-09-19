module Api
  module V1
    class ImagesController < ApplicationController
      def search
        images = External::Giphy::ImageSearcher.search_images!(params[:search_term])

        render json: { images: images }, status: 200
      rescue RestClient::ExceptionWithResponse => e
        render json: { message: e.response }, status: 500
      end
    end
  end
end
