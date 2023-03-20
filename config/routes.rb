Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    get '/exercises', to: 'exercises#index'
    get '/workouts', to: 'workouts#index'
  end

  root 'react#index'
  get '*path', to: 'react#index'
end
