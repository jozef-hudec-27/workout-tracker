class Workout < ApplicationRecord
  has_many :sessions, dependent: :destroy
  belongs_to :user

  default_scope { order('created_at DESC') }
end
