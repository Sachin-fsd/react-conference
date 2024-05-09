import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import {formatText,likePost,deletePost,myFunction} from '../../shared/services/CommonFunctions'
import { UserContext } from "../../shared/services/UserContext";
import './Profile.css'

function Profile(){

    let { id } = useParams();
    const navigate = useNavigate()
    const [ProfileDetails,setProfileDetails] = useState({UserID:123,UserDp:123,UserName:123})
    const [posts,setPosts] = useState([])
    const [follow,setFollow] = useState("Follow")
    const [followers,setFollowers] = useState(0)
    const [following,setFollowing] = useState(0)

    let { UserDetails } = useContext(UserContext);
    if(!UserDetails){
      UserDetails = {UserID:123,UserDp:123,UserName:123}
    }

    async function fetchPosts() {
        console.log(`${process.env.REACT_APP_BACKEND_URL}/${id}`)
        try {
         let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${id}`,{
           headers:{
             "Content-Type":"application/json"
           },
           credentials: 'include',
           method:"GET"
         });
         console.log(res)
         let data = await res.json();
         console.log(data);
         setPosts(data.posts)
         setFollow(data.follow)
         setFollowers(data.followers)
         setFollowing(data.following)
         setProfileDetails(data.ProfileDetails)
        }
         catch(err){
           console.log(err);
           navigate("/login")
         }
       }

       useEffect(() => {
        console.log("in effect")
        fetchPosts();
      }, []);


    return (
        <div class="middle">
            <div class="IDprofile">
                <div class="profile-image">
                    <img
                    src={ProfileDetails.UserDp} 
                    alt=""
                    />
                </div>
                <div class="profile-user-settings">
                    <h1 class="profile-user-name">{ProfileDetails.UserName}</h1>

                { UserDetails.UserID === ProfileDetails.UserID ? (
                    <button
                    //  onclick={()=>{profileEdit(ProfileDetails.UserID)}}
                    class="IDbtn profile-edit-btn"
                    id="message"
                    >Edit</button>
                ):(
                    <div>
                    <button
                        class="IDbtn profile-edit-btn"
                        id="message"
                    >Message</button>
                    <button
                        class="IDbtn profile-edit-btn"
                        id="follow"
                        // onClick={() => followProfile(ProfileDetails.UserID,follow)}
                    >{follow}</button>
                    </div>
                )}
                </div>
                <div className="profile-stats">
                    <ul>
                        <li onClick={fetchPosts}>
                        <span className="profile-stat-count">{posts.length}</span> posts
                        </li>
                        <li 
                        // onClick={() => getFollowers(ProfileDetails.UserID)}
                        >
                        <span className="profile-stat-count" id="followers">{followers}</span> followers
                        </li>
                        <li 
                        // onClick={() => getFollowing(ProfileDetails.UserID)}
                        >
                        <span className="profile-stat-count" id="following">{following}</span> following
                        </li>
                    </ul>
                </div>
                <div class="profile-bio">
                    <p>
                    <span class="profile-real-name">Handle: {ProfileDetails.UserEmail}</span><br></br>
                    {ProfileDetails.UserBio}</p>
                </div>
            </div>

            {/* <div id="myPopup" class="popup">
            <div class="popup-content">
                <label for="" class="text-bold">Delete Post Permanently</label>
                <button id="yesButton" class="formal-button">
                    Yes
                </button>
                <button id="noButton" class="formal-button">
                    No
                </button>
            </div>
            </div> */}
            
            <div class="feeds" id="feeds">
                {posts.length>0 && posts.map((post)=>(
                    <div class="feed">
                        <div class="head">
                            <Link to={`/${ProfileDetails.UserID}`}>
                                <div className="user">
                                <div className="profile-photo">
                                    <img
                                    src={ProfileDetails.UserDp}
                                    alt=""
                                    />
                                </div>
                                <div className="info">
                                    <h3>{ProfileDetails.UserName}</h3>
                                    <small>{post.CreatedAt}</small>
                                </div>
                                </div>
                            </Link>

                            <span className="dropdown edit">
                                <i
                                onclick={() => myFunction(post._id)}
                                className="dropbtn uil uil-ellipsis-h"
                                ></i>
                                {/* <div id={`myDropdown-${post._id}`} className="dropdown-content">
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
                                </div> */}
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
                        <p>
                            <span className="harsh-tag">#lifestyle</span>
                        </p>
                        </div>

                        <Link to={`/comment/${post._id}`}>
                        <div className="comments text-muted">View all comments</div>
                        </Link>
                    </div>

                ))}

            </div>
        </div>
    )
}

export {Profile}