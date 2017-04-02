class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :user

  enum result: {
    correct: 0,
    incorrect: 1
  }
end
