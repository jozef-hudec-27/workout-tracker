class Exercise < ApplicationRecord
  validates :name, presence: true

  belongs_to :user

  def used?
    workouts = user.workouts.includes :sessions
    workouts.each do |workout|
      workout.sessions.each do |session|
        return true if session.exercise == self 
      end
    end

    false
  end
end
