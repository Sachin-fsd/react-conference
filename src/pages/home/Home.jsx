import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { UserContext } from "../../shared/services/UserContext";
import { useNavigate } from "react-router-dom";
import {formatText,likePost,deletePost,myFunction} from "../../shared/services/CommonFunctions";

function Home() {
  console.log("here");
  const navigate = useNavigate()

  const [posts, setPosts] = useState([]);

  async function fetchData() {
   try {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/post`,{
      headers:{
        // Authorization:`Bearer ${localStorage.getItem("token")}`,
        "Content-Type":"application/json"
      },
      credentials: 'include',
      method:"GET"
    });
    console.log(res)
    let data = await res.json();
    console.log(data);
    setPosts(data.posts);}
    catch(err){
      console.log(err);
      navigate("/login")
    }
  }
  
  useEffect(() => {
    console.log("in effect")
    fetchData();
  }, []);

  let { UserDetails } = useContext(UserContext);
  if(!UserDetails){
    UserDetails = {UserID:123,UserDp:123,UserName:123}
  }

  
  function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  // Close the dropdown if the user clicks outside of it
  window.onClick = function (event) {
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

  const post = document.getElementById("create-post");

  const [opacity, setOpacity] = useState(0.8);

  const handleInput = (event) => {
    if (event.target.value.trim().length) {
      setOpacity(1);
    } else {
      setOpacity(0.8);
    }
  };

  const handlePostInput = async () => {
    post.value.trim().length && (await postText(post.value.trim()));
    post.value = null;
  };

  function fileInput(e) {
    const file = e.target.files[0];

    const fileSize = file.size / 1024 / 1024; // in MB
    if (fileSize > 10) {
      alert("File size exceeds 10MB. Please select a smaller file.");
      return;
    }

    const reader = new FileReader();

    if (file.type.startsWith("image/")) {
      reader.onload = function (e) {
        document.getElementById("preview").style.display = "flex";
        document.getElementById("preview-photo").style.display = "block";
        document.getElementById("preview-photo").src = e.target.result;
        document.getElementById("file-name").style.display = "none";
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("video/")) {
      reader.onload = function (e) {
        var video = document.getElementById("preview-video");
        video.style.display = "block";
        video.src = e.target.result;
        video.controls = true;
        // video.style.maxHeight = "300px";
        // video.style.objectFit = "contain"; // Maintain aspect ratio
        document.getElementById("preview").style.display = "flex";
        document.getElementById("preview-photo").style.display = "none";
        document.getElementById("file-name").style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image and non-video files, just display the file name
      document.getElementById("file-name").textContent = file.name;
      document.getElementById("preview").style.display = "flex";

      document.getElementById("file-name").style.display = "block";
      document.getElementById("preview-photo").style.display = "none";
    }
  }

  const [inputDisable, setInputDisable] = useState(false);
  const [inputValue, setInputValue] = useState("Post");

  async function postText(text) {
    setInputValue("Wait..");
    setInputDisable(true);
    setOpacity(0.8);

    // Create a new FormData instance
    const formData = new FormData();
    // Append the text and UserDetails data to the form
    formData.append("text", text);
    formData.append("authorID", UserDetails.UserID);
    // formData.append("UserDetails", UserDetails);
    // Check if an image file is being uploaded
    const file = document.querySelector("#fileinput").files[0];
    if (file) {
      // If a file is being uploaded, append it to the form data
      formData.append("file", file);
    }

    const fetched = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      credentials: 'include',
      method: "POST",
      body: formData,
    });
    if (fetched.ok === true) {
      fetchData();
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <div className="middle">
      <div className="preview" id="preview" style={{ display: "none" }}>
        <img
          id="preview-photo"
          style={{ display: "none" }}
          className="preview-photo"
          alt=""
        />
        <video
          id="preview-video"
          style={{ display: "none" }}
          className="preview-video"
        ></video>
        <p id="file-name" style={{ display: "none" }} className="pdf-name"></p>
      </div>

      <form
        className="create-post"
        id="post_form"
        encType="multipart/form-data"
        onSubmit={(e) => e.preventDefault}
      >
        <div className="profile-photo">
          <img src={UserDetails.UserDp} alt="" />
        </div>

        <textarea
          id="create-post"
          placeholder={`What's on your mind, ${UserDetails.UserName}?`}
          onChange={handleInput}
          onInput={autoResize}
          required
        ></textarea>

        <input
          type="file"
          id="fileinput"
          name="fileinput"
          accept="image/*,application/pdf,video/*"
          style={{ display: "none" }}
          onChange={(e) => fileInput(e)}
        />

        <label htmlFor="fileinput" className="btn">
          <i className="uil uil-upload"></i>
        </label>

        <input
          type="submit"
          id="post-submit-btn"
          value={inputValue}
          className="btn btn-primary"
          disabled={inputDisable}
          style={{ opacity: opacity }}
          onClick={handlePostInput}
        />
      </form>

      <div className="feeds">
        {posts.map((post) => (
          <div className="feed" key={post._id}>
            <div className="head">
              <Link to={`/${post.UserDetails.UserID}`}>
                <div className="user">
                  <div className="profile-photo">
                    <img
                      src={post.UserDetails.UserDp}
                      //   onerror={
                      //     (this.src =
                      //       "https://cdn.pixabay.com/photo/2022/02/26/18/16/peace-7036144_640.png")
                      //   }
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
                      onClick={(e) => {
                        e.preventDefault();
                        deletePost(post._id);
                      }}
                    >
                      Delete
                    </p>
                  )}
                  <Link href={`/comment/${post._id}`}>Comment</Link>
                  <Link href={`/${UserDetails.UserID}`}>Profile</Link>
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

            <div className="action-buttons">
              <div className="interaction-buttons">
                <span
                  className="like-post"
                  onClick={(event) =>
                    likePost(event, post._id, UserDetails.UserID)
                  }
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
              
            </div>
            <Link to={`/comment/${post._id}`}>
              <div className="comments text-muted">View all comments</div>
            </Link>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Home;
