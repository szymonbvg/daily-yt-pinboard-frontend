import { ReactElement, ReactNode } from "react";
import React from "react";
import "./DropDownMenu.css";

type DropDownMenuProps = {
  children: ReactNode;
};

export default function DropDownMenu(props: DropDownMenuProps) {
  const clone = (children: ReactNode): ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === React.Fragment) {
          return clone(child.props.children);
        }
        return React.cloneElement(child as ReactElement);
      }
      return child;
    });
  };

  return (
    <div className="dropdown">
      {React.Children.map(clone(props.children), (item) => {
        return <div className="menu-item">{item}</div>;
      })}
    </div>
  );
}
