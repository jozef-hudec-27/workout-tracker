Rails.application.routes.draw do
  namespace :api do
  end

  root 'react#index'
  get '*path', to: 'react#index'
end
