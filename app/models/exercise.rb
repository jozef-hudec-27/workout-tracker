class Exercise < ApplicationRecord
  validates :name, presence: true
  validates_length_of :name, maximum: 100
  validates_length_of :description, maximum: 1000

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
