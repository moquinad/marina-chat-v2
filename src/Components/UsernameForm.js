import React from "react";

class UsernameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  render() {
    return (
      <div className="columns">
        <div className="username column has-text-centered">
          <form className="username-input box" onSubmit={this.onSubmit}>
            <h1 className="title">Marina: The Chat Application</h1>
            <input
              className="input"
              type="text"
              placeholder="Username"
              onChange={this.onChange}
            />
            <input className="username-button button" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default UsernameForm;
