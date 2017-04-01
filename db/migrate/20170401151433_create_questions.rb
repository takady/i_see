class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.integer :kind, null: false
      t.string :sentence, null: false
      t.string :sound_file_url
      t.string :correct_answer, null: false

      t.timestamps
    end
  end
end
