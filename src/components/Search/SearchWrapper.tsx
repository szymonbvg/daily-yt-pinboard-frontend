import { ReactElement, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import './Search.css';
import { NavbarContext } from "../../contexts/NavbarContext";
import { SearchComponentProps } from "../../types/Search";

type SearchWrapperProps = {
  children: ReactNode;
};

export default function SearchWrapper(props: SearchWrapperProps) {
  const navbarContext = useContext(NavbarContext);
  const [keyword, setKeyword] = useState<string>("");

  const navigate = useNavigate();

  const handleSearch = (evt: string) => {
    if (evt.toLocaleLowerCase() === "enter" || evt.toLocaleLowerCase() === "click") {
      if (keyword) {
        navbarContext?.toggleMenu({value: false});
        navigate(`/search?term=${encodeURIComponent(keyword)}`);
      }
    }
  };

  const handleOnChange = (value: string) => {
    setKeyword(value);
  };

  return (
    <div className="search-bar">
      {React.Children.map(props.children, (children) => {
        return React.cloneElement(
          children as ReactElement,
          {
            eventHandler: handleSearch,
            onChangeHandler: handleOnChange,
            keyword: keyword,
          } as SearchComponentProps
        );
      })}
    </div>
  );
}
