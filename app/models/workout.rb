class Workout < ApplicationRecord
  validates_length_of :title, maximum: 1000

  paginates_per 10

  has_many :sessions, dependent: :destroy
  belongs_to :user

  default_scope { order('created_at DESC') }
end
