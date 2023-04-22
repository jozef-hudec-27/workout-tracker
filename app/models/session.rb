class Session < ApplicationRecord
  validates_length_of :note, maximum: 1000
  validates_length_of :rest_time, maximum: 100

  belongs_to :workout
  belongs_to :exercise
  has_many :series, dependent: :destroy
end
