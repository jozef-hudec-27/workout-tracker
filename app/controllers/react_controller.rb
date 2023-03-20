class ReactController < ApplicationController
  def index
    return redirect_to '/users/sign_in' unless user_signed_in?
  end
end
