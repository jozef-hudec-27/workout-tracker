class ChangeWeightToBeStringInSeries < ActiveRecord::Migration[7.0]
  def change
    change_column :series, :weight, :string
  end
end
