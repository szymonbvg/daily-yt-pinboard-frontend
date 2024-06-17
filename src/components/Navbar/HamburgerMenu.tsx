import { useContext } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import "./HamburgerMenu.css";

export default function HamburgerMenu() {
  const navabarContext = useContext(NavbarContext);

  const handleToggle = () => {
    navabarContext?.toggleMenu();
  };

  return (
    <div onClick={handleToggle} className="hamburger-menu">
      <div className="line">
        <span></span>
      </div>
      <div className="line">
        <span></span>
      </div>
      <div className="line">
        <span></span>
      </div>
    </div>
  );
}
