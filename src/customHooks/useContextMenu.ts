import { useState, useEffect } from "react";
const useContextMenu = () => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleClick = () => setClicked(false);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return {
    clicked,
    setClicked,
    points,
    setPoints,
  };
};
export default useContextMenu;