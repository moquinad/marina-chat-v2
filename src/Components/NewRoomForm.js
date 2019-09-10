import React from "react";

class NewRoomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      roomName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({ roomName: "" });
  }

  render() {
    return (
      <div className="box new-room">
        <form onSubmit={this.handleSubmit}>
          <input
            className="input new-room-input"
            value={this.state.roomName}
            onChange={this.handleChange}
            type="text"
            placeholder="Create a New Room"
            required
          />
          <button
            className="button is-inline"
            id="create-room-btn"
            type="submit"
          >
            +
          </button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
