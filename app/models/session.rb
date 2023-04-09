class Session < ApplicationRecord
  validates_length_of :note, maximum: 1000
  
  belongs_to :workout
  belongs_to :exercise
  has_many :series, dependent: :destroy
end
