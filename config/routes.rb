Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resource :users, only: [:edit, :update]
  resource :groups, only: [:new, :create, :edit, :update]
end
