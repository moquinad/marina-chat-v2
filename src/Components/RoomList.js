import React from "react";
// import WhosOnlineList from "./WhosOnlineList";

class RoomList extends React.Component {
  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
    return (
      <div className="box room-list">
        <ul>
          <h2>Your Rooms:</h2>
          {orderedRooms.map(room => {
            const active = this.props.roomId === room.id ? "active" : "";
            return (
              <li key={room.id} className="room-li">
                <a
                  className={"room" + active}
                  onClick={() => {
                    this.props.subscribeToRoom(room.id);
                  }}
                  href="#"
                >
                  {room.name}
                </a>
              </li>
            );
          })}
        </ul>
        {/* <WhosOnlineList users={this.props.rooms.users} /> */}
      </div>
    );
  }
}

export default RoomList;
