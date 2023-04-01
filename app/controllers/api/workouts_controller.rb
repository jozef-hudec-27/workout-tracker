class Api::WorkoutsController < ApplicationController
  before_action :authenticate_user!

  def index
    page = params[:page] || 1
    workouts = current_user.workouts.page page
    render json: workouts, include: [sessions: { include: %i[series exercise] }]
  end

  def create
    workout_hash = JSON.parse request.body.read
    workout = build_workout_from workout_hash
    render json: workout, include: [sessions: { include: %i[series exercise] }], status: workout ? 201 : 500
  end

  def destroy
    workout = current_user.workouts.find_by id: params[:id]

    return render(json: { message: 'Workout not found' }, status: 404) if workout.nil?

    workout.destroy

    render json: { message: 'Workout has been deleted' }
  end

  private

  def build_workout_from(workout_hash)
    workout = current_user.workouts.new title: workout_hash['title'], notes: workout_hash['notes']

    workout_hash['sessions'].each do |session_hash|
      session = workout.sessions.new note: session_hash['note'], rest_time: session_hash['restTime'], exercise_id: session_hash['exerciseId']

      session_hash['sets'].each do |set_hash|
        set = session.series.new note: set_hash['note'], weight: set_hash['weight'], reps: set_hash['reps']
        set.save if set.valid?
      end

      session.save if session.valid?
    end

    return unless workout.valid?

    workout
  end
end
