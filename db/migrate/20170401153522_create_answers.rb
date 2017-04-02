class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.references :question, foreign_key: true
      t.references :user, foreign_key: true, index: false
      t.string :value
      t.integer :result, null: false
      t.integer :took_msec

      t.timestamps
    end

    add_index :answers, [:user_id, :took_msec]
    add_index :answers, [:user_id, :result]
  end
end
