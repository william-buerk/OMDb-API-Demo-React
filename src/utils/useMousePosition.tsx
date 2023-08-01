import { useState, useMemo } from "react";

const useMousePosition = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const bind = useMemo(
    () => ({
      onMouseMove: (event: MouseEvent) => {
        setX(event.offsetX);
        setY(event.offsetY);
      }
    }),
    []
  );

  return [x, y, bind];
};

export default useMousePosition;