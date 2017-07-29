import React from 'react';

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitAnswer(this.state.value);
  }

  render() {
    return (
      <div className="AnswerForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="answer">
            Answer:
            <input id="answer" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AnswerForm;
