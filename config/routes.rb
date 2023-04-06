Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }, skip: :registrations
  as :user do
    get 'users/cancel', to: 'users#cancel', as: 'cancel_user_registration'
    get 'users/sign_up', to: 'users#new', as: 'new_user_registration'

    put 'users', to: 'users#update', as: 'user_registration'
    delete 'users', to: 'users#destroy'
    post 'users', to: 'users#create'
  end

  namespace :api do
    resources :exercises, only: %i[index create update destroy]
    resources :workouts, only: %i[index create destroy show update]
  end

  root 'react#index'
  get '*path', to: 'react#index'
end
