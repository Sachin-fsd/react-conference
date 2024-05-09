import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../shared/services/UserContext";


function Comment(){
    let { UserDetails } = useContext(UserContext);
    if(!UserDetails){
        UserDetails = {UserID:123,UserDp:123,UserName:123}
    }
    const id = useParams()
    const [comments,setComments] = useState([])
    const [post,setPost] = useState({})

    fetch(`${process.env.REACT_APP_BACKEND_URL}/comment/${id}`).then(res=>res.json()).then(res=>{
        setComments(res.comments);
        setPost(res.post);

    }).catch(err=>console.log(err))

      
      let [UserComment,setUserComment] = useState("")
      
      const feeds = document.querySelector("#feeds");
      
      const socket = io();
      
      socket.emit("join room", post._id);
      
      window.addEventListener("beforeunload", () => {
        socket.emit("leave room", post._id);
      });
    //   post_submit_btn
      const PostComment = async () => {
        let text = UserComment.trim();
        if (text.length) {
          let date = new Date();
          let formattedDate = date.toString().substring(0, 24);
          socket.emit("new comment", {
            text,
            post:post._id,
            UserDetails,
            CreatedAt: formattedDate,
          });
          postText(text);
        }
        UserComment = null;
      };
      
      function append(comment) {
        let div = document.createElement("div");
        div.classList.add("feed");
        div.innerHTML = `
          <div class="head">
          <div class="user">
            <div class="profile-photo">
              <img
                src="${UserDetails.UserDp}"
                onerror="this.src='https://cdn.pixabay.com/photo/2016/11/07/09/07/river-1805188_640.jpg'"
              />
            </div>
            <div class="info">
              <h3>${comment.UserDetails.UserName}</h3>
              <small>${comment.CreatedAt}</small>
            </div>
          </div>
          <span class="edit">
            <i class="uil uil-ellipsis-h"></i>
          </span>
        </div>
        <div class="photo">
          <p class="post-text">${comment.text}</p>
        </div>`;
      
        feeds.insertBefore(div, feeds.firstChild);
      }
      
      socket.on("new comment", (comment) => {
        console.log(comment);
        append(comment);
      });
      
      async function postText(text) {
        const obj = { text,authorID:post.UserDetails.UserID };
        const fetched = await fetch(`/comment/${post._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") ||sessionStorage.getItem("token") ||""}`,
          },
          method: "POST",
          body: JSON.stringify(obj),
        });
      }

    

    return (
        <div className="middle">
          <div className="content-only">
            <div className="feed active-post">
              <div className="head">
                <Link to={`/${post.authorID}`}><div className="user">
                    <div className="profile-photo">
                      <img src={post.UserDetails.UserDp}
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <h3>{post.UserDetails.UserName}</h3>
                      <small>{post.CreatedAt}</small>
                    </div>
                  </div>
                </Link>

                <div id="myPopup" className="popup">
                  <div className="popup-content">
                      <label for="" className="text-bold">Delete Post Permanently</label>
                      <button id="yesButton" className="formal-button">
                          Yes
                      </button>
                      <button id="noButton" className="formal-button">
                          No
                      </button>
                  </div>
                </div>
                
                <span className="dropdown edit">
                  <i onclick="myFunction('{post._id}')" className="dropbtn uil uil-ellipsis-h"></i>
                  <div id="myDropdown-{post._id}" className="dropdown-content">
                      {post.UserDetails.UserID === UserDetails.UserID &&  <p onClick={()=>showDeletePopup(post._id)}>Delete</p>}
                      <Link href="/{post.authorID}">Profile</Link>
                  </div>
                </span>

              </div>
              <div className="photo" >
                <p className="post-text">{post.text}</p>
                {post.photo &&  <img alt="" src="{post.photo}" />}
                {post.video &&  <img alt="" src="{post.video}" />}
                {post.pdf && <img alt="" src="{post.pdf}" />}
                  
              </div>
              <div className="action-buttons">
                <div className="interaction-buttons">
                  <span className="like-post" >
                  {post.liked === 1 ? 
                    <i onClick={(event)=> {(event)=>likePost(event,post._id,post.authorID)}} className='bx bxs-like' style={{color: "#f54a6c;"}}></i>
                    :
                    <i onClick={(event)=> {(event)=>likePost(event,post._id,post.authorID)}} className='bx bx-like' style={{color: "#f54a6c;"}}></i>
                  }
                  </span>
                  <span className="dropdown edit">
                    <i onclick="shareFunction('{post._id}')" className="dropbtn uil uil-share-alt" style={{color: "rgb(104, 49, 192);"}}></i>
                  </span>
                </div>
                <div className="bookmark" onClick={(event)=>savePost(event,post._id,post.authorID)}>
                  <span>
                    {post.saved === 1 ? <i className='bx bxs-bookmark' style={{color: "#6a3bec"}}></i> : <i className='bx bx-bookmark' style={{color: "#6a3bec"}}></i>}
                  </span>
                </div>
              </div>

            </div>
            <p className="post-text">Comments</p>
            <div className="feeds" id="feeds">
              {comments.map((comment)=>(
                <div className="feed">
                  <div className="head">
                    <Link to={`/${comment.authorID._id}`}>
                      <div className="user">
                        <div className="profile-photo">
                          <img
                            src={comment.UserDetails.UserDp}
                            alt=""
                          />
                        </div>
                        <div className="info">
                          <h3>{comment.UserDetails.UserName}</h3>
                          <small>{comment.CreatedAt}</small>
                        </div>
                      </div>
                    </Link>
                    <span className="edit">
                      <i className="uil uil-ellipsis-h"></i>
                    </span>
                  </div>
                  <div className="photo">
                    <p className="post-text" style={{whiteSpace: "pre-wrap"}}>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className="form-only" >
            <form className="create-post" id="post_form" style={{border: "1px solid"}} onSubmit={(e) => e.preventDefault}>
              <div className="profile-photo">
                <img
                  src={UserDetails.UserDp}
                  alt=""
                />
              </div>
              <textarea
                value={UserComment}
                onChange={(e)=>setUserComment(e.target.value)}
                id="create-post"
                placeholder="Write a comment."
              ></textarea>
              <input
                onClick={PostComment}
                type="submit"
                id="post-submit-btn"
                value="Send"
                className="btn btn-primary"
                data-postID={post._id}
                data-authorID={post.authorID._id}
              />
            </form>
          </div>
        </div>
    )
}

export {Comment}