class Series < ApplicationRecord
  validates_length_of :reps, maximum: 50
  validates_length_of :weight, maximum: 50
  validates_length_of :note, maximum: 1000

  belongs_to :session
end
