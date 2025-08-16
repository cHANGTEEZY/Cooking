import { time } from "console";
import React, { useEffect, useState } from "react";

const useIsScreenReisze = () => {
  const [screenResized, setIsScreenResize] = useState(false);

  useEffect(() => {
    const resizeScreen = () => {
      setIsScreenResize(true);
    };

    window.addEventListener("resize", resizeScreen);

    resizeScreen();

    return window.removeEventListener("resize", resizeScreen);
  }, []);

  useEffect(() => {
    if (screenResized) {
      const timer = setTimeout(() => {
        setIsScreenResize(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [screenResized]);

  return { screenResized };
};

export default useIsScreenReisze;
