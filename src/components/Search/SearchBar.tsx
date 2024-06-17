import { SearchComponentProps } from '../../types/Search';
import './Search.css';

export default function SearchBar(props: SearchComponentProps) {
  return (
    <div className="search-field">
      <input
        placeholder="search user"
        value={props.keyword}
        onChange={(e) => props.onChangeHandler?.(e.currentTarget.value)}
        onKeyDown={(e) => props.eventHandler?.(e.code)}
      />
    </div>
  );
}
