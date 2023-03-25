class Workout < ApplicationRecord
  has_many :sessions
  belongs_to :user

  default_scope { order('created_at DESC') }
end
