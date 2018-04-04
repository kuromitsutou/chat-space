class FavoritesController < ApplicationController
  before_action :set_favorite, only: :destroy

  def create
    @favorite = Favorite.new(favorite_params)
    @save_success = @favorite.save
    @favorite_count = Favorite.where(message_id: params[:message_id]).count

    respond_to do |format|
      format.html
      format.json
    end
  end

  def destroy
    @delete_success = @favorite.destroy
    @favorite_count = Favorite.where(message_id: params[:message_id]).count

    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def set_favorite
    @favorite = Favorite.find(params[:id])
  end

  def favorite_params
    params.permit(:message_id).merge(user_id: current_user.id)
  end

end
