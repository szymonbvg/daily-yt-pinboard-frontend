import { useEffect, useState } from "react";

export function useQuery() {
  const searchParams = new URLSearchParams(location.search);
  const [query, setQuery] = useState<URLSearchParams>();

  useEffect(() => {
    setQuery(searchParams);
  }, [location.search]);

  return query;
}
