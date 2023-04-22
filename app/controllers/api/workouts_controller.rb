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
    render json: workout, include: [sessions: { include: %i[series exercise] }], status: workout.nil? ? 500 : 201
  end

  def destroy
    workout = current_user.workouts.find_by id: params[:id]

    return render(json: { message: 'Workout not found' }, status: 404) if workout.nil?

    workout.destroy

    render json: { message: 'Workout has been deleted' }
  end

  def show
    workout = current_user.workouts.find_by id: params[:id]

    return render(json: { message: 'Workout not found' }, status: 404) if workout.nil?

    render json: workout, include: [sessions: { include: %i[series exercise] }]
  end

  def update
    workout = current_user.workouts.find_by id: params[:id]

    return render(json: { message: 'Workout not found' }, status: 404) if workout.nil?

    workout_hash = JSON.parse request.body.read
    workout.update title: workout_hash['title'], notes: workout_hash['notes']

    workout.sessions.destroy_all
    build_sessions_for_from(workout, workout_hash['sessions'])

    render json: workout, include: [sessions: { include: %i[series exercise] }]
  end

  private

  def build_workout_from(workout_hash)
    workout = current_user.workouts.new title: workout_hash['title'], notes: workout_hash['notes']

    workout_hash['sessions'].each do |session_hash|
      session = workout.sessions.new note: session_hash['note'],
                                     rest_time: session_hash['rest_time'], exercise_id: session_hash['exercise_id']

      session_hash['series'].each do |set_hash|
        set = session.series.new note: set_hash['note'], weight: set_hash['weight'], reps: set_hash['reps']
        set.save if set.valid?
      end

      session.save if session.valid?
    end

    return unless workout.save

    workout
  end

  def build_sessions_for_from(workout, sessions_arr)
    sessions_arr.each do |session_hash|
      session = workout.sessions.new note: session_hash['note'], rest_time: session_hash['rest_time'],
                                     exercise_id: session_hash['exercise_id']

      session_hash['series'].each do |set_hash|
        set = session.series.new note: set_hash['note'], weight: set_hash['weight'], reps: set_hash['reps']
        set.save if set.valid?
      end

      session.save if session.valid?
    end
  end
end
