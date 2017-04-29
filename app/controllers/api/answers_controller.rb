class Api::AnswersController < ApplicationController
  def new
    question = Question.first

    render json: question.as_json.merge(started_at: Time.current)
  end

  def create
    took_msec = (Time.current - answer_started_at) * 1000 if answer_started_at

    answer = current_user.answers.build(question_id: params[:question_id], value: params[:value], took_msec: took_msec || 0)
    answer.check_answer!

    render json: answer, status: :created
  end

  private

  def answer_started_at
    Time.zone.parse(params[:started_at])
  rescue
    nil
  end
end
