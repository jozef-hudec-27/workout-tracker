class MakeExerciseDescriptionNullable < ActiveRecord::Migration[7.0]
  def change
    change_column_null :exercises, :description, true
  end
end
