Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      namespace :images do
        get 'search', to: 'search#search'

        resources :favorites, only: [:index, :create,  :destroy]
      end
    end
  end
end
