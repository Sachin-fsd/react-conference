import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom

const Head = ({ UserDetails, messages }) => {
  const [messageSearch, setMessageSearch] = useState(''); // State for search term

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
      </div>
    </div>
  );
};

export {Head};
