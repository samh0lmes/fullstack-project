module Api
  module V1
    module Images
      class SearchController < ApplicationController
        def search
          images = External::Giphy::ImageSearcher.search_images!(search_term: params[:search_term], user_id: session[:user_id])

          render json: { images: images }, status: 200
        rescue RestClient::ExceptionWithResponse => e
          render json: { message: e.response }, status: 500
        end
      end
    end
  end
end
