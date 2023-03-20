class AddSessinToSeries < ActiveRecord::Migration[7.0]
  def change
    add_reference :series, :session, null: false, foreign_key: true
  end
end
