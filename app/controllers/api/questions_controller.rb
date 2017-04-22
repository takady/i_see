class Api::QuestionsController < ApplicationController
  NUMBER_OF_QUESTIONS = 20

  def index
    cursor = params[:cursor] || 0

    questions = Question.order(:id).offset(cursor).first(NUMBER_OF_QUESTIONS)

    render json: questions
  end
end
