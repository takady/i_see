class Question < ApplicationRecord
  has_many :answers

  enum kind: {
    listening: 1,
    ja_to_en: 2
  }

  validates :sentence, :correct_answer, presence: true
  validates :sound_file_url, presence: true, if: -> { listening? }

  def sentence_with_blank
    words = correct_answer.split(' ')
    blank_target_index = Random.rand(0..(words.size - 1))

    words.map.with_index {|word, index|
      index.between?(blank_target_index - 1, blank_target_index + 1) ? '_' * word.size : word
    }.join(' ')
  end
end
