# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

ApplicationRecord.transaction do
  Answer.delete_all
  Question.delete_all

  CSV.read(Rails.root.join('source.tsv'), col_sep: "\t").each.with_index(1) {|csv, index|
    Question.create!(id: index, kind: :ja_to_en, sentence: csv.last, correct_answer: csv.first)
  }
end
