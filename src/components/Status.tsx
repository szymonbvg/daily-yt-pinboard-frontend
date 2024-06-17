import { Link } from "react-router-dom";
import { MessageType } from "../structures/Common";

type StatusProps = {
  type: MessageType.LOADING | MessageType.NOT_FOUND;
};

export default function Status(props: StatusProps) {
  const elementStyle = {
    width: "auto",
    height: "auto",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
      }}>
      <h1 style={elementStyle}>{props.type}</h1>
      <Link style={elementStyle} to={"/"}>
        home page
      </Link>
    </div>
  );
}
