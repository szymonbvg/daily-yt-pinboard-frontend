import { Link, useNavigate } from "react-router-dom";
import { PostFormat } from "../../types/Profile";
import "./Post.css";

type PostProps = {
  preview?: boolean;
  data: PostFormat;
};

export default function Post(props: PostProps) {
  const navigate = useNavigate();

  const fixURL = () => {
    if (props.data.url.includes("https://") || props.data.url.includes("http://")) {
      return props.data.url;
    }
    return "https://" + props.data.url;
  };

  return (
    <div className="post" onClick={() => !props.preview && navigate(`post/${props.data.id}`)}>
      <div className="post-view">
        <div className="date">
          <p>------</p>
          <p>{props.data.date}</p>
        </div>
        <div className="post-content">
          <p id="title">{props.data.heading}</p>
          <Link to={fixURL()}>{props.data.url}</Link>
        </div>
      </div>
    </div>
  );
}
