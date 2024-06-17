import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { NavbarContext } from "../contexts/NavbarContext";

type CustomLinkProps = {
  to: string;
  children: ReactNode;
};

export default function CustomLink(props: CustomLinkProps) {
  const navbarContext = useContext(NavbarContext);

  const handleOnClick = () => {
    navbarContext?.toggleMenu({ value: false });
  };

  return (
    <Link onClick={handleOnClick} to={props.to}>
      {props.children}
    </Link>
  );
}
