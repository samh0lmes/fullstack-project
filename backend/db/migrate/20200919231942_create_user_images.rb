class CreateUserImages < ActiveRecord::Migration[6.0]
  def change
    create_table :user_images do |t|
      t.references :user
      t.references :image
      t.boolean :favorited

      t.timestamps null: false
    end

    add_index :user_images, [:user_id, :image_id], unique: true
  end
end
