import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const useLocation = () => {
  const id = useSelector((state) => state.task.id);
  const timeoutRef = useRef(null);
  const getLocation = () => {
    console.log("thuc thi task");
    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     addLocation(position.coords)
    //       .then((data) => {})
    //       .catch(() => {});
    //   },
    //   (error) => {},
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );
    timeoutRef.current = setTimeout(getLocation, 2000);
  };

  useEffect(() => {
    if (id) {
      getLocation();
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [id]);
};

export default useLocation;
