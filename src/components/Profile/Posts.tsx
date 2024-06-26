import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import Post from "./Post";
import "./Posts.css";
import PostAdd from "./PostAdd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PostFormat, ProfileParams } from "../../types/Profile";
import { ProfileResponse } from "../../types/Response";

export default function Posts() {
  const params = useParams<ProfileParams>();
  const profileContext = useContext(ProfileContext);

  const [posts, setPosts] = useState<PostFormat[]>([]);

  useEffect(() => {
    setPosts(profileContext.content);
  }, [profileContext]);

  const loadMore = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/v1/profiles/${params.profile}`, {
        headers: { "X-Loaded-Posts": posts.length },
      })
      .then((res) => {
        const parsed = res.data as ProfileResponse;
        setPosts((prev) => prev.concat(parsed.content));
      });
  };

  return (
    <div className="posts">
      {profileContext.authenticated && <PostAdd />}
      {posts.map((post) => {
        return <Post key={post.id} data={post} />;
      })}
      {profileContext.lenght !== undefined &&
        profileContext.lenght > 10 &&
        posts.length < profileContext.lenght && (
          <div className="more-posts">
            <button id="more-posts-btn" onClick={loadMore}>
              load more
            </button>
          </div>
        )}
    </div>
  );
}
