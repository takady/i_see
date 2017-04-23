class Api::AnswersController < ApplicationController
  def create
    # TODO track it
    took_msec = 0

    answer = current_user.answers.build(question_id: params[:question_id], value: params[:value], took_msec: took_msec)
    answer.check_answer
    answer.save!

    render json: answer, status: :created
  end
end
