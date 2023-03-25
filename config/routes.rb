Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    get '/exercises', to: 'exercises#index'
    resources :workouts, only: [:index, :create]
  end

  root 'react#index'
  get '*path', to: 'react#index'
end
