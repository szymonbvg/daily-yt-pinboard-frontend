import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Message from "../Message";
import "./InputForm.css";
import { useCaptcha } from "../../hooks/useCaptcha";

type InputFormProps = {
  type: "login" | "register";
};

export default function InputForm(props: InputFormProps) {
  const username = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);
  const passCheck = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const captcha = useCaptcha("6LcomfYpAAAAAFxK37yJot5xj4vZGTN4TJLFmAEI");

  const auth = useContext(AuthContext);

  const authenticate = () => {
    if (props.type === "register" && !captcha.rendered) {
      captcha.render();
    }

    if (username.current?.value && pass.current?.value) {
      auth.handleAuth({
        type: props.type,
        username: username.current.value,
        pass: pass.current.value,
        passCheck: passCheck.current?.value,
        captcha: captcha.getResponse()
      });
    }
  };

  useEffect(() => {
    if (auth.data?.status) {
      navigate("/");
    }
  }, [auth.data?.status]);

  return (
    <div className="input-form">
      <div className="input-item">
        <input ref={username} placeholder="username" />
      </div>
      <div className="input-item">
        <input ref={pass} type="password" placeholder="password" />
      </div>
      {props.type === "register" && (
        <div className="input-item">
          <input ref={passCheck} type="password" placeholder="re-enter password" />
        </div>
      )}
      <button onClick={authenticate}>{props.type}</button>
      {props.type === "register" && captcha.element}
      {auth.data?.message && (
        <div className="message">
          <Message content={auth.data.message} status={auth.data.status} />
        </div>
      )}
    </div>
  );
}
