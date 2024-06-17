import { useEffect, useState } from "react";

type SizeState = {
  width: number;
  height: number;
};

export function useWindowSize() {
  const [size, setSize] = useState<SizeState>({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}
