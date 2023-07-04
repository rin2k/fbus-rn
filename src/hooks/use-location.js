import { addLocation } from "@/services";
import { useEffect, useRef } from "react";
import Geolocation from "react-native-geolocation-service";
import { useSelector } from "react-redux";

const useLocation = () => {
  const id = useSelector((state) => state.task.id);
  const timeoutRef = useRef(null);
  const getLocation = () => {
    // console.log("run task");
    Geolocation.getCurrentPosition(
      (position) => {
        try {
          const inputObj = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          addLocation(inputObj)
            .then((data) => {})
            .catch((error) => {});
        } catch (error) {}
      },
      (error) => {},
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
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
