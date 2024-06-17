import { useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import Post from "./Post";
import "./Posts.css";
import PostAdd from "./PostAdd";

export default function Posts() {
  const profileContext = useContext(ProfileContext);

  return (
    <div className="posts">
      {profileContext.authenticated && <PostAdd posts={profileContext.content} />}
      {profileContext.content.map((post) => {
        return <Post key={post.id} data={post} />;
      })}
    </div>
  );
}
