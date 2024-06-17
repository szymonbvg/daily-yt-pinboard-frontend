import { ReactNode, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProfileResponse } from "../../types/Response";
import Status from "../Status";
import { ProfileParams } from "../../types/Profile";
import { MessageType } from "../../structures/Common";

type ProfileWrapperProps = {
  children: ReactNode;
};

export default function ProfileWrapper(props: ProfileWrapperProps) {
  const params = useParams<ProfileParams>();
  const [response, setResponse] = useState<ProfileResponse>({ status: null, content: [] });

  const token = localStorage.getItem("token");
  const idURL = `/post/${params.id}`;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/v1/profiles/${params.profile}${params.id ? idURL : ""}`, {
        headers: { "X-Auth-Token": token },
      })
      .then((res) => {
        const parsed = res.data as ProfileResponse;
        setResponse(parsed);
      });
  }, [params]);

  return (
    <ProfileContext.Provider value={response}>
      <div className="pinboard" style={{ height: "100%" }}>
        {response.status !== null ? (
          response.status ? (
            props.children
          ) : (
            <Status type={MessageType.NOT_FOUND} />
          )
        ) : (
          <Status type={MessageType.LOADING} />
        )}
      </div>
    </ProfileContext.Provider>
  );
}
