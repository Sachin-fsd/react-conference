import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css'
import '../login/Login.css'

function Search() {
  function formatText(text) {
    return text.split("\n").map((line, index) => <p key={index}>{line}</p>);
  }
  function myFunction(id) {
    document.getElementById("myDropdown-" + id).classList.toggle("show");
  }
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
  function likePost(event, postID, authorID) {
    console.log(event, postID, authorID);

    if (event.target.className === "bx bx-like") {
      event.target.className = "bx bxs-like";
      // event.target.setAttribute("style", "color: #f54a6c");
    } else {
      event.target.className = "bx bx-like";
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/like/${postID}/${authorID}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchUser()
    // const delayDebounceFn = setTimeout(() => {
    //   if (query.length > 0) {
    //     setLoading(true);
    //     searchUser();
    //   }
    // }, 2000); // Delay for 2000 ms, not 500 ms

    return ;
  }, []);

  async function searchUser() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/search?query=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data)
      if (!data) {
        throw new Error("Invalid data structure received from the server");
      }
      setPosts(data.posts || []);
      setUsers(data.users || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className="middle">
      <div className="search-bar serach-page-top">
        <i className="uil uil-search"></i>
        <input
          id="searchInput"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setLoading(true);
              searchUser();
            }
          }}
          placeholder="Search for creators, inspiration and projects"
        />
      </div>
      <div className="feeds" id="results">
        {loading ? (
          <div>Loading...</div>
        ) : users.length === 0 && posts.length === 0 ? (
          <div className="feed">
            <h2>No results found for {query}</h2>
          </div>
        ) : (
          <>
          {posts.length>0 && posts.map((post) => (
            <div className="feed" key={post._id}>
              <div className="head">
                <Link to={`/${post.authorID._id}`}>
                  <div className="user">
                    <div className="profile-photo">
                      <img
                        src={post.authorID.dp}
                        // onerror={this.src='https://source.unsplash.com/random'}
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <h3>{post.authorID.name}</h3>
                      <small>{post.CreatedAt}</small>
                    </div>
                  </div>
                </Link>

                {/* <span className="dropdown edit">
                  <i
                    onclick={() => myFunction(post._id)}
                    className="dropbtn uil uil-ellipsis-h"
                  ></i>
                  <div
                    id={`myDropdown-${post._id}`}
                    className="dropdown-content"
                  >
                    <Link href={`/comment/${post._id}`}>Comment</Link>
                    <Link href={`/${post.authorID._id}`}>Profile</Link>
                  </div>
                </span> */}
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
                      title="id"
                      id="pdf-preview"
                      src={`http://docs.google.com/gview?url=${post.pdf}&embedded=true`}
                      style={{ width: 475, height: 400, display: "none" }}
                      onLoad={(e) => {
                        document.getElementById("pdf-loader").style.display =
                          "none";
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

              {/* <div className="action-buttons">
                <div className="interaction-buttons">
                  <span
                    className="like-post"
                    onClick={(event) =>
                      likePost(event, post._id, post.UserDetails.UserID)
                    }
                  >
                    {post.liked === 1 ? (
                      <i
                        className="bx bxs-like"
                        style={{ color: "#f54a6c" }}
                      ></i>
                    ) : (
                      <i
                        className="bx bx-like"
                        style={{ color: "#f54a6c" }}
                      ></i>
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
              </div> */}

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
          ))}

          {users.length>0 && users.map((user) => (
            <div className="feed" key={user._id}>
              <div className="head">
                <Link to={`/${user._id}`}>
                  <div className="user">
                    <div className="profile-photo">
                      <img
                        src={user.dp}
                        // onerror={this.src='https://source.unsplash.com/random?user={{this._id}}'}
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <h3>{user.name}</h3>
                    </div>
                  </div>
                </Link>
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
            </div>
          ))}
          </>
        )}
      </div>
    </div>
  );
}

export { Search };
