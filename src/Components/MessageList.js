import React from "react";
import reactDOM from "react-dom";
import Message from "./Message";

class MessageList extends React.Component {
  componentWillUpdate() {
    const node = reactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = reactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
    const node = reactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  render() {
    if (!this.props.roomId) {
      return (
        <div className="box message-list">
          <div className="join-room">&larr; Join a room!</div>
        </div>
      );
    }
    return (
      <div className="box message-list">
        {this.props.messages.map((message, index) => {
          return (
            <Message
              key={index}
              username={message.senderId}
              text={message.parts[0].payload.content}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
