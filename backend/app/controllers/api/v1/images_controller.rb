module Api
  module V1
    class ImagesController < ApplicationController
      def search
        render json:  [{ src: 'https://media1.giphy.com/media/12HZukMBlutpoQ/200w.gif?cid=96ebb03bu5tp8r2uho5w7cjqztos3afd9rd6v6rdzo3bl8sg&rid=200w.gif', title: 'A cool image' }]
      end
    end
  end
end
