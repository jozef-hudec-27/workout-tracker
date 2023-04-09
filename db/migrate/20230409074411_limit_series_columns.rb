class LimitSeriesColumns < ActiveRecord::Migration[7.0]
  def change
    change_column :series, :reps, :string, limit: 50
    change_column :series, :weight, :string, limit: 50
    change_column :series, :note, :string, limit: 1000
  end
end
