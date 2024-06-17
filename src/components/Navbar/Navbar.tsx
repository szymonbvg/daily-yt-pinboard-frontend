import { useContext } from "react";
import SearchBar from "../Search/SearchBar";
import SearchButton from "../Search/SearchButton";
import SearchWrapper from "../Search/SearchWrapper";
import "./Navbar.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useWindowSize } from "../../hooks/useWindowSize";
import HamburgerMenu from "./HamburgerMenu";
import CustomLink from "../CustomLink";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const size = useWindowSize();

  return (
    <div className="navbar">
      <div id="title" className="nav-item">
        <CustomLink to={"/"}>Daily(YT)Pinboard</CustomLink>
      </div>
      {size.width >= 750 ? (
        <>
          {location.pathname !== "/" && (
            <div className="search">
              <SearchWrapper>
                <SearchBar />
                <SearchButton />
              </SearchWrapper>
            </div>
          )}
          <div id="user" className="nav-item">
            <CustomLink to={"/settings"}>{auth.data?.status ? auth.data.username : "guest"}</CustomLink>
          </div>
        </>
      ) : (
        <HamburgerMenu />
      )}
    </div>
  );
}
