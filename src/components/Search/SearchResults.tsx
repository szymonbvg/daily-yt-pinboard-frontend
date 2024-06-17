import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "../../hooks/useQuery";
import Status from "../Status";
import "./Search.css";
import { ProfileSearch } from "../../types/Profile";
import { MessageType } from "../../structures/Common";

export default function SearchResults() {
  const [results, setResults] = useState<ProfileSearch[] | undefined>();

  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    if (query) {
      if (query.get("term")) {
        axios.get(`${import.meta.env.VITE_API_URL}/v1/search${location.search}`).then((res) => {
          const parsed = res.data as { username: string; posts: number }[];
          setResults(parsed);
        });
      } else {
        navigate("/");
      }
    }
  }, [query]);

  return (
    <div className="search-results">
      {results ? (
        results.length > 0 ? (
          results.map((profile) => {
            return (
              <div key={`profile-${profile.username}`} className="result">
                <div className="profile" onClick={() => navigate(`/user/${profile.username}`)}>
                  <div className="text">
                    <p>{profile.username}</p>
                  </div>
                  <div className="text">
                    <p>posts: {profile.posts}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Status type={MessageType.NOT_FOUND} />
        )
      ) : (
        <Status type={MessageType.LOADING} />
      )}
    </div>
  );
}
