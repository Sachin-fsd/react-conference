import { Link } from "react-router-dom";
import '../../../App.css'

function Profile({"UserDetails":{UserID,UserDp,UserName}}) {
  return (
    <Link to={`/${UserID}`} className="profile">
      <div className="profile-photo">
        <img src={UserDp} alt="" />
      </div>
      <div className="handle">
        <h4>{UserName}</h4>
        <p className="text-muted">@{UserName}</p>
      </div>
    </Link>
  );
}

export {Profile}
