class CreateSeries < ActiveRecord::Migration[7.0]
  def change
    create_table :series do |t|
      t.integer :reps, null: false
      t.integer :weight
      t.string :note

      t.timestamps
    end
  end
end
