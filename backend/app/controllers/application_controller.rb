class ApplicationController < ActionController::Base
  before_action :set_user

  # To replace with sign up/ log in functionality
  def set_user
    return if session[:user_id]

    session[:user_id] = User.create!.id
  end
end
