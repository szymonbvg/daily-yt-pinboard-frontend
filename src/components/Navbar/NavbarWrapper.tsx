import { ReactNode, useContext, useEffect, useState } from "react";
import { NavbarContext, ToggleFuncProps } from "../../contexts/NavbarContext";
import DropDownMenu from "./DropDownMenu";
import { useWindowSize } from "../../hooks/useWindowSize";
import { AuthContext } from "../../contexts/AuthContext";
import SearchWrapper from "../Search/SearchWrapper";
import SearchButton from "../Search/SearchButton";
import SearchBar from "../Search/SearchBar";
import CustomLink from "../CustomLink";

type NavbarWrapperProps = {
  children: ReactNode;
};

export default function NavbarWrapper(props: NavbarWrapperProps) {
  const auth = useContext(AuthContext);

  const [toggled, setToggled] = useState(false);
  const size = useWindowSize();

  const toggle = (props?: ToggleFuncProps) => {
    if (props) {
      setToggled(props.value);
      return;
    }
    setToggled((prev) => !prev);
  };

  useEffect(() => {
    if (size.width >= 750) {
      setToggled(false);
    }
  }, [size.width]);

  return (
    <NavbarContext.Provider value={{ toggleMenu: toggle }}>
      {props.children}
      {toggled && (
        <DropDownMenu>
          <SearchWrapper>
            <SearchBar />
            <SearchButton />
          </SearchWrapper>
          {auth.data?.status ? (
            <CustomLink to={"/settings"}>{auth.data.username}</CustomLink>
          ) : (
            <>
              <CustomLink to={"/login"}>login</CustomLink>
              <CustomLink to={"/register"}>register</CustomLink>
            </>
          )}
        </DropDownMenu>
      )}
    </NavbarContext.Provider>
  );
}
