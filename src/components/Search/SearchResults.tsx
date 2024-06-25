import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "../../hooks/useQuery";
import Status from "../Status";
import "./Search.css";
import { ProfileSearch } from "../../types/Profile";
import { MessageType } from "../../structures/Common";

export default function SearchResults() {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<ProfileSearch[] | undefined>();

  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    if (query) {
      const queryIndex = query.get("i");
      const parsedIndex = queryIndex ? (!isNaN(parseInt(queryIndex)) ? parseInt(queryIndex) : 0) : 0;
      setIndex(parsedIndex);

      if (query.get("term")) {
        axios.get(`${import.meta.env.VITE_API_URL}/v1/search${location.search}`).then((res) => {
          const parsed = res.data as ProfileSearch[];
          setResults(parsed);
        });
      } else {
        navigate("/");
      }
    }
  }, [query]);

  useEffect(() => {
    if (index > 0 && query) {
      const url = new URL(location.href);
      if (query.get("i")) {
        url.searchParams.set("i", index.toString());
      } else {
        url.searchParams.append("i", index.toString());
      }
      navigate(url.pathname + url.search);
    }
  }, [index]);

  return (
    <div className="search-results">
      {results ? (
        results.length > 0 ? (
          <>
            {results.map((profile) => {
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
            })}
            <div className="more">
              <button id="more-btn" onClick={() => setIndex((prev) => prev + 10)}>
                Load more
              </button>
            </div>
          </>
        ) : (
          <Status type={query?.get("i") ? MessageType.NO_RESULTS : MessageType.NOT_FOUND} />
        )
      ) : (
        <Status type={MessageType.LOADING} />
      )}
    </div>
  );
}
