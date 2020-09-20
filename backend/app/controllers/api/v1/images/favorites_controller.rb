module Api
  module V1
    module Images
      class FavoritesController < ApplicationController
        def index
          user = User.find_by!(id: session[:user_id])

          render json: { images: user.mapped_favorite_images }, status: 200
        end

        def create
          ::Images::Favorites::UserImageFavoriter.favorite!(user_id: session[:user_id], image: params[:image])

          render json: {}, status: 201
        end

        def destroy
          ::Images::Favorites::UserImageUnfavoriter.unfavorite!(user_id: session[:user_id], external_id: params[:id])

          render json: {}, status: 204
        end
      end
    end
  end
end
