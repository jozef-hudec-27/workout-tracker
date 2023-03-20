class Session < ApplicationRecord
  belongs_to :workout
  belongs_to :exercise
  has_many :series
end
