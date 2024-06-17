import axios from "axios";
import { useRef, useState } from "react";
import { PostFormat } from "../../types/Profile";
import Message from "../Message";
import { getHeading } from "../../util/Heading";
import "./Post.css";
import { getMessage } from "../../structures/Common";

type PostResponse = {
  status: boolean | null;
  message?: string;
};

type PostAddProps = {
  posts: PostFormat[];
};

export default function PostAdd({ posts }: PostAddProps) {
  const url = useRef<HTMLInputElement | null>(null);
  const token = localStorage.getItem("token");
  const [response, setResponse] = useState<PostResponse>({ status: null });

  const checkDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const parsed = day + "-" + month + "-" + year;

    return !posts.some((i) => i.date === parsed);
  };

  const addPost = () => {
    if (url.current?.value && !response.status) {
      const message = getMessage({ url: url.current.value, dateCallback: checkDate });
      if (message) {
        setResponse({ status: false, message: message });
        return;
      }

      axios
        .post(
          "http://localhost:3000/v1/post/add",
          { heading: getHeading(), url: url.current.value },
          { headers: { "Content-Type": "application/json", "X-Auth-Token": token } }
        )
        .then((ans) => {
          setResponse(ans.data);
        });
    }
  };

  return (
    <div className="post">
      <div className="post-view">
        <p id="title">add post</p>
        <div className="post-content">
          <p id="heading">heading: {getHeading()}</p>
          <div className="add-form">
            <div className="add-input">
              <div className="url-input">
                <input ref={url} placeholder="URL" />
              </div>
              <button onClick={addPost}>share</button>
            </div>
            {response.status !== null && (
              <div className="message">
                {response.status && <button onClick={() => location.reload()}>refresh</button>}
                <Message content={response.message} status={response.status} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
