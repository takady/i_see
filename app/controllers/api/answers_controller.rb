class Api::AnswersController < ApplicationController
  def new
    question = Question.random

    render json: question.as_json.merge(
      started_at: Time.current,
      first_time: question.for_the_first_time?(current_user),
      question_sentence: question.for_the_first_time?(current_user) ? question.correct_answer : question.sentence_with_blank
    )
  end

  def create
    took_msec = (Time.current - answer_started_at) * 1000 if answer_started_at

    answer = current_user.answers.build(answer_params.merge(took_msec: took_msec || 0))
    skipped? ? answer.skip! : answer.check!

    render json: answer.as_json.merge(correct_answer: answer.question.correct_answer), status: :created
  end

  private

  def answer_params
    params.permit(:question_id, :question_sentence, :answer)
  end

  def skipped?
    !!params[:skip]
  end

  def answer_started_at
    Time.zone.parse(params[:started_at])
  rescue
    nil
  end
end
