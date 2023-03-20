class AddExerciseToSession < ActiveRecord::Migration[7.0]
  def change
    add_reference :sessions, :exercise, null: false, foreign_key: true
  end
end
