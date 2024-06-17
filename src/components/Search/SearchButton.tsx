import './Search.css';
import { SearchComponentProps } from "../../types/Search";

export default function SearchButton(props: SearchComponentProps) {
  return (
    <div className="search-btn">
      <button onClick={(e) => props.eventHandler?.(e.type)}>OK</button>
    </div>
  );
}
