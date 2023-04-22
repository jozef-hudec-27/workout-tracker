class ChangeRestTimeToString < ActiveRecord::Migration[7.0]
  def change
    change_column(:sessions, :rest_time, :string, limit: 100)
  end
end
