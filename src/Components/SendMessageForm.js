import React from "react";
import "bulma/css/bulma.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      showEmojis: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addEmoji = this.addEmoji.bind(this);
    this.showEmojis = this.showEmojis.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showEmojis = e => {
    this.setState(
      {
        showEmojis: true
      },
      () => document.addEventListener("click", this.closeMenu)
    );
  };

  closeMenu = e => {
    console.log(this.emojiPicker);
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState(
        {
          showEmojis: false
        },
        () => document.removeEventListener("click", this.closeMenu)
      );
    }
  };

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
    this.props.onChange();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  }

  addEmoji = e => {
    // console.log(e.native);
    let emoji = e.native;
    this.setState({
      message: this.state.message + emoji
    });
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="is-inline-flex form box send-message"
        >
          <input
            className="input"
            disabled={this.props.disabled}
            onChange={this.handleChange}
            value={this.state.message}
            placeholder="Type message here!"
            type="text"
          />
          {/* </form> */}
          {this.state.showEmojis ? (
            <span
              className="is-pulled-right"
              ref={el => (this.emojiPicker = el)}
            >
              <Picker
                onSelect={this.addEmoji}
                emojiTooltip={true}
                title="Chat"
              />
            </span>
          ) : (
            <p className="is-inline is-pulled-right" onClick={this.showEmojis}>
              {String.fromCodePoint(0x1f60a)}
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
