import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../App.css";

function Sidebar({setIsOpen}) {
  const location = useLocation()
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleClick = (path) => {
    setActiveMenuItem(path);
  };

  useEffect(()=>{
    setActiveMenuItem(location.pathname)
  },[location])

  return (
    <>
      <div className="sidebar">
        <Link
          to="/"
          className={`menu-item ${activeMenuItem === "/" ? "active" : ""}`}
          onClick={() => handleClick("/")}
        >
          <span>
            <i className="uil uil-home"></i>
          </span>
          <h3>Home</h3>
        </Link>
        <Link
          to="/search"
          className={`menu-item ${
            activeMenuItem === "/search" ? "active" : ""
          }`}
          onClick={() => handleClick("/search")}
        >
          <span>
            <i className="uil uil-compass"></i>
          </span>
          <h3>Search</h3>
        </Link>
        <Link
          to="/"
          id="notifications"
          className={`menu-item ${
            activeMenuItem === "/notifications" ? "active" : ""
          }`}
          onClick={() => handleClick("/notifications")}
        >
          <span>
            <i className="uil uil-bell">
              <small className="notification-count"></small>
            </i>
          </span>
          <h3>Notifications</h3>
        </Link>
        <Link
          to="/message"
          id="messages-notification"
          className={`menu-item ${
            activeMenuItem === "/message" ? "active" : ""
          }`}
          onClick={() => handleClick("/message")}
        >
          <span>
            <i className="uil uil-envelope-alt">
              <small className="notification-count"></small>
            </i>
          </span>
          <h3>Messages</h3>
        </Link>
        <Link
          to="/bookmarks"
          className={`menu-item ${
            activeMenuItem === "/bookmarks" ? "active" : ""
          }`}
          onClick={() => handleClick("/bookmarks")}
        >
          <span>
            <i className="uil uil-bookmark"></i>
          </span>
          <h3>Bookmarks</h3>
        </Link>
        <Link
          to="/analytics"
          className={`menu-item ${
            activeMenuItem === "/analytics" ? "active" : ""
          }`}
          onClick={() => handleClick("/analytics")}
        >
          <span>
            <i className="uil uil-chart-line"></i>
          </span>
          <h3>Analytics</h3>
        </Link>
        <Link
          id="theme"
          className={`menu-item`}
          onClick={(e) => {setIsOpen(true)}}
        >
          <span>
            <i className="uil uil-palette"></i>
          </span>
          <h3>Theme</h3>
        </Link>
        <Link
          to="/settings"
          className={`menu-item ${
            activeMenuItem === "/settings" ? "active" : ""
          }`}
          onClick={() => handleClick("/settings")}
        >
          <span>
            <i className="uil uil-setting"></i>
          </span>
          <h3>Settings</h3>
        </Link>
      </div>
      <label htmlFor="create-post" className="btn btn-primary">
        Create Post
      </label>
    </>
  );
}

export {Sidebar};
