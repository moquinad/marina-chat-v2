import React from "react";

function Message(props) {
  return (
    <div className="message">
      <div className="message-header">{props.username}:</div>
      <div className="message-body">{props.text}</div>
    </div>
  );
}

export default Message;
