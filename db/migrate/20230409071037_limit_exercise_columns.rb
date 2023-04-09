class LimitExerciseColumns < ActiveRecord::Migration[7.0]
  def change
    change_column :exercises, :name, :string, limit: 100
    change_column :exercises, :description, :text, limit: 1000
  end
end
