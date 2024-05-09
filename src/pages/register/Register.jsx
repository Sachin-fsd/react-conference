function Register() {
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
              <h2 style={{ fontSize: "30px" }}>CONFERENCE</h2>
            </div>
            <div id="login">
              <form id="register_form" action="#">
                <div class="form-group">
                  <input
                    style={{ marginTop: "-25px" }}
                    id="name"
                    class="form-input"
                    name="name"
                    pattern=".{1,}"
                    placeholder="Name"
                    title="Enter Name"
                    onkeyup="stateHandle()"
                    required
                    type="text"
                  />
                  <label class="floating-label" for="name">
                    Name
                  </label>
                </div>
                <div class="form-group">
                  <input
                    id="username"
                    class="form-input"
                    name="username"
                    pattern=".{1,}"
                    placeholder="Email"
                    title="Enter Email"
                    onkeyup="stateHandle()"
                    required
                    type="text"
                  />
                  <label class="floating-label" for="username">
                    Email
                  </label>
                </div>
                <div class="form-group">
                  <input
                    id="password"
                    class="form-input"
                    placeholder="Password"
                    title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters."
                    oninput="stateHandle()"
                    required
                    type="password"
                  />
                  <label class="floating-label" for="password">
                    Password
                  </label>
                  <button id="show-btn" onclick="showPassword()" type="button">
                    Show
                  </button>
                  <button id="hide-btn" onclick="showPassword()" type="button">
                    Hide
                  </button>
                </div>
                <input
                  formaction="#"
                  id="submit-btn"
                  name="submit"
                  type="submit"
                  value="Sign Up"
                />
              </form>
            </div>
            <div id="alt-options">
              <div id="or-separator" style={{ marginTop: "20px" }}>
                <div></div>
                <p>Or</p>
                <div></div>
              </div>
              <div id="fb-login">
                <a href="https://github.com/login/oauth/authorize?client_id=39521ba78547704f90d1&scope=user:email">
                  <span class="fab fa-github"></span>
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
              Alreadt Registered?{" "}
              <span>
                <a href="/login">Log In</a>
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
                  src="https://www.instagram.com/static/images/pppstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                  alt="Get it on Google Play"
                />
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div id="footer-ctr">
          <div>
            <p>Meta</p>
            <p>About</p>
            <p>Blog</p>
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

export {Register}