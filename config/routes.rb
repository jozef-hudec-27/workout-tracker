Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    resources :exercises, only: %i[index create]
    resources :workouts, only: %i[index create destroy]
  end

  root 'react#index'
  get '*path', to: 'react#index'
end
