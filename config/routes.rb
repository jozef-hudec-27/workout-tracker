Rails.application.routes.draw do
  devise_for :users

  namespace :api do
  end

  root 'react#index'
  get '*path', to: 'react#index'
end
