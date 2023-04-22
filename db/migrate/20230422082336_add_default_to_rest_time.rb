class AddDefaultToRestTime < ActiveRecord::Migration[7.0]
  def change
    change_column :sessions, :rest_time, :string, default: ''
  end
end
