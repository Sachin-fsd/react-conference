import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RightSidebar = ({ UserDetails, messages, users }) => {
  const [messageSearch, setMessageSearch] = useState('');

  useEffect(() => {
    // No action needed here as messages are passed as props
  }, []);

  const searchMessage = (event) => {
    const val = event.target.value.toLowerCase();
    setMessageSearch(val);
  };

  const filteredMessages = messages.filter((message) => {
    const name = message.sender.UserName.toLowerCase() + message.receiver.UserName.toLowerCase();
    return name.indexOf(messageSearch) !== -1;
  });

  return (
    <div className="right">
      <div className="messages">
        <div className="heading">
          <h4>Messages</h4>
          <i className="uil uil-edit"></i>
        </div>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            id="message-search"
            placeholder="Search messages"
            value={messageSearch}
            onChange={searchMessage}
          />
        </div>
        <div className="category">
          <h6 className="active">Primary</h6>
          <h6>General</h6>
          <h6 className="message-requests">Requests{3}</h6>
        </div>
        {filteredMessages.map((message) => (
          <div className="message" key={message.id}> {/* Add key prop for better performance */}
            <div className="profile-photo">
              <img
                src="https://cdn.pixabay.com/photo/2023/11/19/14/10/hangzhou-8398789_640.jpg"
                alt=""
              />
            </div>
            <div className="message-body">
              <Link
                to={`/chat/${
                  message.sender.UserID === UserDetails.UserID
                    ? message.receiver.UserID
                    : message.sender.UserID
                }`}
                className="profile unread users-profile"
              >
                <h5>
                  {message.sender.UserID === UserDetails.UserID
                    ? message.receiver.UserName
                    : message.sender.UserName}
                </h5>
                <p className="text-muted">in chatlist</p>
              </Link>
            </div>
          </div>
        ))}
        <p className="text-muted">New Users</p>
        {users.length > 0 &&
          users.map((user) => (
            <div className="message" key={user._id}>
              <div className="profile-photo">
                <img
                  src="https://cdn.pixabay.com/photo/2023/11/19/14/10/hangzhou-8398789_640.jpg"
                  alt=""
                />
              </div>
              <div className="message-body">
                <Link
                  to={`/${user._id}`}
                  className="profile unread users-profile"
                >
                  <h5>{user.name}</h5>
                  <p className="text-muted">user at conference</p>
                </Link>
              </div>
            </div>
          ))}

      </div>
      <div className="friend-requests">
        <h4>Requests</h4>
        <p className="text-muted">No requests at the moment</p>
        {/* <div className="request">
          <div className="info">
            <div className="profile-photo">
              <img src="https://cdn.pixabay.com/photo/2023/03/29/19/32/man-7886201_640.jpg" />
            </div>
            <div>
              <h5>Hajia Bintu</h5>
              <p className="text-muted">8 mutual friends</p>
            </div>
          </div>
          <div className="action">
            <button className="btn btn-primary">Accept</button>
            <button className="btn">Decline</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default RightSidebar;
