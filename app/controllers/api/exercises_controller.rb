class Api::ExercisesController < ApplicationController
  before_action :authenticate_user!

  def index
    @exercises = current_user.exercises
    render json: @exercises
  end
end
