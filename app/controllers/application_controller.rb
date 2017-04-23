class ApplicationController < ActionController::Base
  private

  def current_user
    # TODO make it possible to signin
    @current_user ||= User.find_by(id: 1)
  end
end
