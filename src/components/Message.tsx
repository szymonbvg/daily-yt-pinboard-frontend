export type MessageProps = {
  content: string | null | undefined;
  status: boolean | null | undefined;
};

export default function Message(props: MessageProps) {
  const color = props.status ? "green" : "red";

  return (
    props.content && (
      <p
        style={{
          color: color,
          width: "auto",
          height: "auto",
        }}>
        {props.content}
      </p>
    )
  );
}
