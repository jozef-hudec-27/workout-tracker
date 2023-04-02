class Api::ExercisesController < ApplicationController
  before_action :authenticate_user!

  def index
    @exercises = current_user.exercises
    render json: @exercises
  end

  def create
    exercise_hash = JSON.parse request.body.read
    exercise = build_exercise_from exercise_hash
    render json: exercise, status: exercise ? 201 : 500
  end

  def update
    exercise = current_user.exercises.find_by id: params[:id]
    exercise_hash = JSON.parse request.body.read
    render json: exercise, status: exercise&.update(name: exercise_hash['name'], description: exercise_hash['description']) ? 200 : 500
  end

  def destroy
    exercise = current_user.exercises.find_by id: params[:id]

    if exercise&.used?
      render json: { message: "Can't delete an exercise because it is being used." }
    else
      exercise&.destroy
      message = exercise ? 'Exercise deleted successfully.' : 'Could not delete exercise.'
      render json: { message: }, status: exercise ? 200 : 500
    end
  end

  private

  def build_exercise_from(exercise_hash)
    exercise = current_user.exercises.new name: exercise_hash['name'], description: exercise_hash['description']
    return unless exercise.save

    exercise
  end
end
