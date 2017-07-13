class Question < ApplicationRecord
  has_many :answers

  enum kind: {
    listening: 1,
    ja_to_en: 2
  }

  validates :sentence, :correct_answer, presence: true
  validates :sound_file_url, presence: true, if: -> { listening? }

  def self.random
    offset(rand(count)).first
  end

  def sentence_with_blank
    words = correct_answer.split(' ')
    blank_target_index = rand(0..(words.size - 1))

    words.map.with_index {|word, index|
      index.between?(blank_target_index - 1, blank_target_index + 1) ? word.gsub(/[a-zA-Z]/, '_') : word
    }.join(' ')
  end

  def for_the_first_time?(user)
    !answered_by?(user)
  end

  def answered_by?(user)
    answers.exists?(user_id: user.id)
  end
end
