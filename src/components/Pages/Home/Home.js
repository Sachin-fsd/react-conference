// import React from "react";
// import { Link } from "react-router-dom";

// function formatText(text) {
//   return text.split("\n").map((line, index) => <p key={index}>{line}</p>);
// }

// function Home({ posts, UserDetails }) {
//   return (
//     <div className="middle">
//       <div className="preview" id="preview" style={{ display: "none" }}>
//         <img
//           id="preview-photo"
//           style={{ display: "none" }}
//           className="preview-photo"
//           alt=""
//         />
//         <video
//           id="preview-video"
//           style={{ display: "none" }}
//           className="preview-video"
//         ></video>
//         <p id="file-name" style={{ display: "none" }} className="pdf-name"></p>
//       </div>

//       <form
//         className="create-post"
//         id="post_form"
//         enctype="multipart/form-data"
//       >
//         <div className="profile-photo">
//           <img src={UserDetails.UserDp} alt="" /> 
//         </div>

//         <textarea
//           id="create-post"
//           placeholder={`What's on your mind, ${UserDetails.UserName}?`}
//           required
//         ></textarea>

//         <input
//           type="file"
//           id="fileinput"
//           name="fileinput"
//           accept="image/*,application/pdf,video/*"
//           style={{display: "none"}}
//         />

//         <label for="fileinput" className="btn">
//           <i className="uil uil-upload"></i>
//         </label>

//         <input
//           type="submit"
//           id="post-submit-btn"
//           value="Post"
//           className="btn btn-primary"
//         />
//       </form>

//       <div className="feeds">
//         {posts.map((post) => (
//           <div className="feed">
//             <div className="head">
//               <Link to={`/${post.UserDetails.UserID}`}>
//                 <div className="user">
//                   <div className="profile-photo">
//                     <img
//                       src={post.UserDetails.UserDp}
//                       onerror={
//                         (this.src =
//                           "https://cdn.pixabay.com/photo/2022/02/26/18/16/peace-7036144_640.png")
//                       }
//                       alt=""
//                     />
//                   </div>
//                   <div className="info">
//                     <h3>{post.UserDetails.UserName}</h3>
//                     <small>{post.CreatedAt}</small>
//                   </div>
//                 </div>
//               </Link>

//               {/* <!-- <span className="edit">
//                     <i className="uil uil-ellipsis-h"></i>
//                   </span> --> */}

//               <span className="dropdown edit">
//                 <i
//                   onClick={() => myFunction(post._id)}
//                   className="dropbtn uil uil-ellipsis-h"
//                 ></i>
//                 <div id={`myDropdown-${post._id}`} className="dropdown-content">
//                   {post.UserDetails.UserID === UserDetails.UserID && (
//                     <a
//                       href="#"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         deletePost(post._id);
//                       }}
//                     >
//                       Delete
//                     </a>
//                   )}
//                   <Link href={`/comment/${post._id}`}>Comment</Link>
//                   <Link href={`/${UserDetails.UserID}`}>Profile</Link>
//                 </div>
//               </span>
//             </div>
//             <Link to={`/comment/${post._id}`}>
//               <div className="photo">
//                 {post.photo && (
//                   <img
//                     src={post.photo}
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                     }}
//                   />
//                 )}
//                 {post.video && (
//                   <video
//                     width=""
//                     height=""
//                     controls
//                     src={post.video}
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                     }}
//                     className="preview-video"
//                   ></video>
//                 )}
//                 {post.pdf && (
//                   <div
//                     id="pdf-loader"
//                     style={{
//                       width: 475,
//                       height: 400,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <p>Loading PDF...</p>
//                   </div>
//                 )}
//                 {post.pdf && (
//                   <iframe
//                     id="pdf-preview"
//                     src={`http://docs.google.com/gview?url=${post.pdf}&embedded=true`}
//                     style={{ width: 475, height: 400, display: "none" }}
//                     onLoad={(e) => {
//                       document.getElementById("pdf-loader").style.display =
//                         "none";
//                       e.target.style.display = "block";
//                     }}
//                   ></iframe>
//                 )}
//                 {post.pdf && (
//                   <a href={post.pdf} download>
//                     Download PDF
//                   </a>
//                 )}
//                 <p className="post-text">{formatText(post.text)}</p>
//               </div>
//             </Link>

//             <div className="action-buttons">
//               <div className="interaction-buttons">
//                 <span
//                   className="like-post"
//                   onClick={(event) =>
//                     likePost(event, post._id, UserDetails.UserID)
//                   }
//                 >
//                   {post.liked === 1 ? (
//                     <i className="bx bxs-like" style={{ color: "#f54a6c" }}></i>
//                   ) : (
//                     <i className="bx bx-like" style={{ color: "#f54a6c" }}></i>
//                   )}
//                 </span>
//                 <span>
//                   <Link to={`/comment/${post._id}`}>
//                     <i
//                       className="uil uil-comment-dots"
//                       style={{ color: "rgb(51, 100, 51)" }}
//                     ></i>
//                   </Link>
//                 </span>
//                 <span>
//                   <i className="uil uil-share-alt"></i>
//                 </span>
//               </div>
//               <div className="bookmark">
//                 <span>
//                   <i className="uil uil-bookmark-full"></i>
//                 </span>
//               </div>
//             </div>

//             <div className="caption">
//               <p>
//                 <b>B.tech CSE FSD</b>| Section 1 | Group 1 |<b>Roll No.</b>
//                 2301350008
//               </p>
//               <p>
//                 <span className="harsh-tag">#lifestyle</span>
//               </p>
//             </div>
//             <Link to={`/comment/${post._id}`}>
//               <div className="comments text-muted">View all comments</div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;
