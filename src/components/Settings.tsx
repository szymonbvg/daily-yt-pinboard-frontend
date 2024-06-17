import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./Settings.css";
import { getDefaultHeading, getHeading, setHeading } from "../util/Heading";
import Message, { MessageProps } from "./Message";
import { getMessage, MessageType } from "../structures/Common";

export default function Settings() {
  const [message, setMessage] = useState<MessageProps>();

  const heading = useRef<HTMLInputElement | null>(null);
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSave = () => {
    if (heading.current?.value) {
      const message = getMessage({heading: heading.current.value});
      if (message) {
        setMessage({status: false, content: message});
        return;
      }
      const success = setHeading(heading.current.value);
      setMessage({ status: success, content: success ? MessageType.SAVED : MessageType.ERROR });
    }
  };

  useEffect(() => {
    if (!auth.data?.status) {
      navigate("/");
    }
  }, []);

  return (
    <div className="settings">
      <div className="elements">
        <p>custom heading: (max 80 characters)</p>
        <input ref={heading} placeholder="custom heading of your posts" />
        <p>default heading: {getDefaultHeading()}</p>
        <button onClick={handleSave}>save</button>
        <p>current heading: {getHeading()}</p>
        <div className="message">
          <Message status={message?.status} content={message?.content} />
        </div>
        <button onClick={auth.handleLogout} id="logout">
          logout
        </button>
        <div className="profile-link">
          <Link to={`/user/${auth.data?.username}`}>go to profile</Link>
        </div>
      </div>
    </div>
  );
}
