import React from "react";
import Chatkit from "@pusher/chatkit-client";
import Header from "./Header";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import RoomList from "./RoomList";
import NewRoomForm from "./NewRoomForm";
import TypingIndicator from "./TypingIndicator";
// import WhosOnlineList from "./WhosOnlineList";
import "bulma/css/bulma.css";
import { instanceLocator, tokenUrl } from "../config";

class ChatScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      usersWhoAreTyping: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: "http://localhost:3001/authenticate"
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => console.log("error on connecting: ", err));
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("error on joinableRooms: ", err));
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoomMultipart({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            console.log("Received message:", message);
            this.setState({
              messages: [...this.state.messages, message]
            });
          },
          onUserStartedTyping: user => {
            this.setState({
              usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
            });
          },
          onUserStoppedTyping: user => {
            this.setState({
              usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                username => username !== user.name
              )
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      })
      .catch(err => console.log("error on subscribing to room: ", err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  createRoom(roomName) {
    this.currentUser
      .createRoom({
        name: roomName
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log("error with createRoom: ", err));
  }

  sendTypingEvent() {
    this.currentUser.isTypingIn({
      roomId: this.state.roomId
    });
  }

  render() {
    console.log(this.currentUser);
    return (
      <div className="App">
        <Header />
        <div className="columns">
          <div className="column is-one-fifth">
            <RoomList
              roomId={this.state.roomId}
              subscribeToRoom={this.subscribeToRoom}
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            />
            {/* <WhosOnlineList users={this.state.joinableRooms.users} /> */}

            <NewRoomForm createRoom={this.createRoom} />
          </div>
          <div className="column">
            <MessageList
              roomId={this.state.roomId}
              messages={this.state.messages}
            />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm
              disabled={!this.state.roomId}
              sendMessage={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatScreen;
