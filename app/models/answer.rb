class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :user

  attr_accessor :question_sentence, :answer

  enum result: {
    correct: 0,
    incorrect: 1,
    skip: 2
  }

  def check!
    self.value = question_sentence.gsub(/_[_,.!\s]*_/, answer)

    correct_answer? ? correct! : incorrect!
  end

  private

  def correct_answer?
    question.correct_answer == value
  end
end
