class LimitSessionColumns < ActiveRecord::Migration[7.0]
  def change
    change_column :sessions, :note, :string, limit: 1000
  end
end
