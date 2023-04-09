class LimitWorkoutColumns < ActiveRecord::Migration[7.0]
  def change
    change_column :workouts, :title, :string, limit: 1000
  end
end
