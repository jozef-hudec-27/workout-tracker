class Exercise < ApplicationRecord
  validates :name, presence: true
  has_many :sessions, dependent: :destroy

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
