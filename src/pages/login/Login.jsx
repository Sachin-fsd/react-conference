import React,{useState,useContext,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import { UserContext } from "../../shared/services/UserContext";

function Login() {

  const {setUserDetails} = useContext(UserContext)

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [loginDisable,setLoginDisable] = useState(true)
  const [showButton,setShowButton] = useState("inline-block")
  const [hideButton,setHideButton] = useState("hidden")

  // LOGIN BUTTON ENABLE + DISABLE FUNCTION
  function stateHandle() {
    if (username.length > 0 && password.length >= 4) {
      setLoginDisable(false)
    } else {
      setLoginDisable(true)
    }
  }

  const [pwdType, setPwdType] = useState("password")

  function showPassword() {
    if (password.type === "password") {
      setPwdType("text")
      setShowButton("none")
      setHideButton("visible")
    } else {
      setPwdType("password")
      setHideButton("hidden")
      setShowButton("inline-block")
    }
  }

  const [submitValue,setSubmitBtnValue] = useState("Log In");
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault();
    setSubmitBtnValue("Wait...")
    setLoginDisable(true)
    const obj = { email:username, password };
      console.log(obj);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
      method: "POST",
    })
      .then((res) => {
        console.log(res);
        if (res.ok === false) {
          alert("Wrong Credentials.");
          setSubmitBtnValue("Log In")
          setLoginDisable(false)
          return
        } 
        return res.json()
      })
      .then((res) => {
        console.log(res)
        // localStorage.setItem("token",res.token)
        setUserDetails(res.UserDetails)
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
        setSubmitBtnValue("Log In")
        setLoginDisable(false)
      });
  };

  return (
    <>
      <main>
        <section id="photos-ctr">
          <img
            src="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png"
            alt="Two smart phones, one black, one white, the white one overlapping the other; both phone screen display example images from the website."
          />
          <div id="phone-display">
            <img
              id="image-1"
              src="https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg"
              alt="A woman standing in front of many tall cacti."
            />
            <img
              id="image-2"
              src="https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg"
              alt="A potted orange Desert Cabbage against a blue wall."
            />
            <img
              id="image-3"
              src="https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg"
              alt="Text conversation contianing images of cats and cat puns."
            />
            <img
              id="image-4"
              src="https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg"
              alt="Top view of a green Tree Aeonium plant."
            />
            <img
              id="image-5"
              src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg"
              alt="Instagram profile display for Jane Appleseed."
            />
          </div>
        </section>

        <section id="details-ctr">
          <div id="login-ctr">
            <div id="logo">
              <h2 style={{fontsize: "30px"}}>CONFERENCE</h2>
            </div>
            <div id="login">
              <form id="login_form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    id="username"
                    className="form-input"
                    name="username"
                    pattern=".{1,}"
                    placeholder="Email"
                    title="Enter Email"
                    onKeyUp={stateHandle}
                    required
                    type="text"
                    onChange={(e)=>{stateHandle();setUsername(e.target.value)}}
                    value={username}
                  />
                  <label className="floating-label" htmlFor="username">
                    Email
                  </label>
                </div>
                <div className="form-group">
                  <input
                    id="password"
                    className="form-input"
                    pattern=".{1,}"
                    placeholder="Password"
                    title="Enter Password"
                    onInput={stateHandle}
                    required
                    value={password}
                    type={pwdType}
                    onChange={(e)=>{stateHandle();setPassword(e.target.value)}}
                  />
                  <label className="floating-label" htmlFor="password">
                    Password
                  </label>
                  <button id="show-btn" onClick={showPassword} type="button" style={{display:showButton}}>
                    Show
                  </button>
                  <button id="hide-btn" onClick={showPassword} type="button" style={{visibility:hideButton}}>
                    Hide
                  </button>
                </div>
                <input
                  id="submit-btn"
                  name="submit"
                  type="submit"
                  value={submitValue}
                  disabled={loginDisable}
                />
              </form>
            </div>
            <div id="alt-options">
              <div id="or-separator" style={{marginTop:"10px"}}>
                <div></div>
                <p>Or</p>
                <div></div>
              </div>
              <div id="fb-login">
                <a href="https://github.com/login/oauth/authorize?client_id=39521ba78547704f90d1&scope=user:email">
                  <span className="fab fa-github"></span>
                  <h5>Log in with Github</h5>
                </a>
              </div>
              <div id="forget_pwd">
                <p>
                  <a href="/forgetpwd">Forgot password?</a>
                </p>
              </div>
            </div>
          </div>
          <div id="sign-up-ctr">
            <p>
              Don't have Account?
              <span>
                <a href="/login">Sign Up</a>
                <Link to={`${process.env.REACT_APP_BACKEND_URL}/register`}>Sign Up</Link>
              </span>
            </p>
          </div>
          <div id="get-app-ctr">
            <p>Get the app.</p>
            <div>
              <p>
                <img
                  src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
                  alt="Download on the App Store"
                />
              </p>
              <p>
                <img
                  src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                  alt="Get it on Google Play"
                />
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer style={{marginTop:"80px"}}>
        <div id="footer-ctr">
          <div>
            <p >Meta</p>
            <p >About</p>
            <p >Blog</p>
            <p>Jobs</p>
            <p>Help</p>
            <p>API</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Top Accounts</p>
            <p>Hashtags</p>
            <p>Locations</p>
            <p>Instagram Lite</p>
          </div>
          <div>
            <p>Beauty</p>
            <p>Dance</p>
            <p>Fitness</p>
            <p>Foot & Drink</p>
            <p>Home & Garden</p>
            <p>Music</p>
            <p>Visual Arts</p>
          </div>
          <div>
            <select>
              <option value="en">English</option>
              <option value="en">English</option>
            </select>
            <p id="select-replace">English</p>
            <div id="select-carrot-wrap">
              <span>
                <svg
                  id="select-carrot"
                  role="img"
                  viewBox="0 0 24 24"
                  height="12"
                  width="12"
                >
                  <path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path>
                </svg>
              </span>
            </div>
            <p id="meta-gram">© 2023 Conference</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export {Login}