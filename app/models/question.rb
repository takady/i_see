class Question < ApplicationRecord
  has_many :answers

  enum kind: {
    listening: 1,
    ja_to_en: 2
  }

  validates :sentence, :correct_answer, presence: true
  validates :sound_file_url, presence: true, if: -> { listening? }
end
