Rails.application.routes.draw do
  get '/' => 'root#index'

  namespace :api do
    resources :questions, only: :index
  end
end
