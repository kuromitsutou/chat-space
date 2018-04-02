class MessagesController < ApplicationController
  before_action :set_group

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
      flash.now[:notice] = 'メッセージが送信されました'
      # redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
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

end
