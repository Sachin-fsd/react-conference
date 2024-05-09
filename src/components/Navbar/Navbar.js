import { Link } from 'react-router-dom';

function Navbar({ UserDetails: { UserID, UserDp } }) {
  return (
    <nav>
      <div className="container">
        <h2 className="logo">Conference</h2>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search for creators, inspiration and projects"
          />
        </div>
        <div className="create">
          <label htmlFor="create-post" className="btn btn-primary">
            Create
          </label>
          <Link to={`/${UserID}`}>
            <div className="profile-photo">
              <img src={UserDp} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
