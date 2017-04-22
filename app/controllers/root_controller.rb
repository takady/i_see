class RootController < ApplicationController
  def index
    render(
      html: view_context.react_component('Root'),
      layout: true,
      status: 200
    )
  end
end