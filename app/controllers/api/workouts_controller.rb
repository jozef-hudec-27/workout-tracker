class Api::WorkoutsController < ApplicationController
  before_action :authenticate_user!

  def index
    @workouts = current_user.workouts
    render json: @workouts, include: [sessions: { include: [:series, :exercise]}]
  end
end
