Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :user, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create, :destroy] do
      resources :favorites, only: [:create, :destroy]
    end
  end
end
