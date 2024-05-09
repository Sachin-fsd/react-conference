import React from "react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  function deletePost(id) {
    fetch("/delete/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => window.location.reload())
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="feed">
      <div className="head">
        <Link to={`/${post.authorID}`}>
          <div className="user">
            <div className="profile-photo">
              <img
                src={post.UserDetails.UserDp}
                onerror={
                  (this.src =
                    "https://cdn.pixabay.com/photo/2022/02/26/18/16/peace-7036144_640.png")
                }
                alt=""
              />
            </div>
            <div className="info">
              <h3>{post.UserDetails.UserName}</h3>
              <small>{post.CreatedAt}</small>
            </div>
          </div>
        </Link>

        <span className="dropdown edit">
          <i
            onClick={() => myFunction(post._id)}
            className="dropbtn uil uil-ellipsis-h"
          ></i>
          <div id={`myDropdown-${post._id}`} className="dropdown-content">
            {post.UserDetails.UserID === UserDetails.UserID && (
              <p
                href="#"
                onClick={() => {
                  deletePost(post._id);
                }}
              >
                Delete
              </p>
            )}
            <Link href={`/comment/${post._id}`}>Comment</Link>
            <Link href={`/${post.authorID}`}>Profile</Link>
          </div>
        </span>
      </div>
      <Link to={`/comment/${post._id}`}>
        <div className="photo">
          {post.photo && (
            <img
              alt=""
              src={post.photo}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          {post.video && (
            <video
              width=""
              height=""
              controls
              src={post.video}
              onError={(e) => {
                e.target.style.display = "none";
              }}
              className="preview-video"
            ></video>
          )}
          {post.pdf && (
            <div
              id="pdf-loader"
              style={{
                width: 475,
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>Loading PDF...</p>
            </div>
          )}
          {post.pdf && (
            <iframe
              title={post._id}
              id="pdf-preview"
              src={`http://docs.google.com/gview?url=${post.pdf}&embedded=true`}
              style={{ width: 475, height: 400, display: "none" }}
              onLoad={(e) => {
                document.getElementById("pdf-loader").style.display = "none";
                e.target.style.display = "block";
              }}
            ></iframe>
          )}
          {post.pdf && (
            <a href={post.pdf} download>
              Download PDF
            </a>
          )}
          <p className="post-text">{formatText(post.text)}</p>
        </div>
      </Link>

      <div className="action-buttons">
        <div className="interaction-buttons">
          <span
            className="like-post"
            onClick={(event) => likePost(event, post._id, UserDetails.UserID)}
          >
            {post.liked === 1 ? (
              <i className="bx bxs-like" style={{ color: "#f54a6c" }}></i>
            ) : (
              <i className="bx bx-like" style={{ color: "#f54a6c" }}></i>
            )}
          </span>
          <span>
            <Link to={`/comment/${post._id}`}>
              <i
                className="uil uil-comment-dots"
                style={{ color: "rgb(51, 100, 51)" }}
              ></i>
            </Link>
          </span>
          <span>
            <i className="uil uil-share-alt"></i>
          </span>
        </div>
        <div className="bookmark">
          <span>
            <i className="uil uil-bookmark-full"></i>
          </span>
        </div>
      </div>

      <div className="caption">
        <p>
          <b>B.tech CSE FSD</b>| Section 1 | Group 1 |<b>Roll No.</b>
          2301350008
        </p>
        <p>
          <span className="harsh-tag">#lifestyle</span>
        </p>
      </div>
      <Link to={`/comment/${post._id}`}>
        <div className="comments text-muted">View all comments</div>
      </Link>
    </div>
  );
}
