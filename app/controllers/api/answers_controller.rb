class Api::AnswersController < ApplicationController
  def new
    question = Question.random

    render json: question.as_json.merge(started_at: Time.current, question_sentence: question.sentence_with_blank)
  end

  def create
    took_msec = (Time.current - answer_started_at) * 1000 if answer_started_at

    answer = current_user.answers.build(answer_params.merge(took_msec: took_msec || 0))
    answer.check_answer!

    render json: answer, status: :created
  end

  private

  def answer_params
    params.permit(:question_id, :question_sentence, :answer)
  end

  def answer_started_at
    Time.zone.parse(params[:started_at])
  rescue
    nil
  end
end
