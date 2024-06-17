import { useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import { Link, useParams } from "react-router-dom";
import Post from "./Post";
import "./PostByID.css";
import { ProfileParams } from "../../types/Profile";

export default function PostByID() {
  const profileContext = useContext(ProfileContext);
  const params = useParams<ProfileParams>();

  return (
    <div className="specific-post">
      {params.id && <Post preview={true} data={profileContext.content[0]} />}
      <Link to={`/user/${params.profile}`}>see all posts</Link>
    </div>
  );
}
