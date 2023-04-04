Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    resources :exercises, only: %i[index create update destroy]
    resources :workouts, only: %i[index create destroy show update]
  end

  root 'react#index'
  get '*path', to: 'react#index'
end
