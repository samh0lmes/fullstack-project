class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :external_id, null: false
      t.string :src, null: false
      t.string :title, null: false

      t.timestamps
    end
  end
end
