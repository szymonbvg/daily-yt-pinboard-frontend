import { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Search/SearchBar";
import SearchWrapper from "./Search/SearchWrapper";
import SearchButton from "./Search/SearchButton";
import { AuthContext } from "../contexts/AuthContext";
import "./Home.css";

export default function Home() {
  const auth = useContext(AuthContext);

  return (
    <div className="home">
      <div className="search">
        <SearchWrapper>
          <SearchBar />
          <SearchButton />
        </SearchWrapper>
      </div>
      <div className="options">
        {auth.data?.status ? (
          <Link to={`/user/${auth.data.username}`}>your profile</Link>
        ) : (
          <>
            <Link to={"/login"}>login</Link>
            <Link to={"/register"}>register</Link>
          </>
        )}
      </div>
    </div>
  );
}
