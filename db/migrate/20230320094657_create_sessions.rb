class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.references :workout, null: false, foreign_key: true
      t.string :note
      t.integer :rest_time

      t.timestamps
    end
  end
end
