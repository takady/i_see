class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :user

  enum result: {
    correct: 0,
    incorrect: 1
  }

  def check_answer!
    correct_answer? ? correct! : incorrect!
  end

  private

  def correct_answer?
    question.correct_answer == value
  end
end
