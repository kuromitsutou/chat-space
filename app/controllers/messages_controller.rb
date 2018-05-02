class MessagesController < ApplicationController
  before_action :set_group
  before_action :set_message, only: [:destroy, :update]

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @current_user_id = current_user.id

    if params[:max_message_id].present?
      @messages = @messages.where("id > #{params[:max_message_id]}").includes(:user)
    elsif params[:keyword].present?
      @messages = @messages.where("body LIKE(?)","%#{params[:keyword]}%").includes(:user)
    end

    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = @group.messages.new(message_params)

    if @message.save
      @save_success = true
      @flash_message = 'メッセージが送信されました'
    else
      save_success = false
      @flash_message = 'メッセージを入力してください。'
    end

    respond_to do |format|
      format.html { redirect_to group_messages_path(@group) }
      format.json
    end

  end

  def destroy

    if @message.destroy
      @destroy_success = true
      @flash_message = 'メッセージが削除されました'
    else
      @destroy_success = false
      @flash_message = 'メッセージの削除に失敗しました'
    end

    respond_to do |format|
      format.html { redirect_to group_messages_path(@group) }
      format.json
    end

  end

  def update
    if @message.update(message_params)
      @update_success = true
      @flash_message = 'メッセージが更新されました'
    else
      @update_success = false
      @flash_message = 'メッセージの更新に失敗しました'
    end

    respond_to do |format|
      format.html { redirect_to group_messages_path(@group) }
      format.json
    end

  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_message
    @message = Message.find(params[:id])
  end

end
