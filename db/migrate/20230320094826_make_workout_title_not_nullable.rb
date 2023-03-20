class MakeWorkoutTitleNotNullable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :workouts, :title, false
  end
end
