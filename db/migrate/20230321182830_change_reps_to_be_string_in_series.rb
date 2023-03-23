class ChangeRepsToBeStringInSeries < ActiveRecord::Migration[7.0]
  def change
    change_column :series, :reps, :string
  end
end
