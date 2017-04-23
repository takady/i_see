Rails.application.routes.draw do
  get '/' => 'root#index'

  namespace :api do
    resources :questions, only: :index
    resources :answers, only: :create
  end

  get '*path' => 'root#index'
end
