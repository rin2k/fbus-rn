import { addLocation } from "@/services";
import { useEffect, useRef } from "react";
import Geolocation from "react-native-geolocation-service";
import { useSelector } from "react-redux";

const useLocation = () => {
  const busId = useSelector((state) => state.task.busId);
  const routeId = useSelector((state) => state.task.routeId);
  const code = useSelector((state) => state.task.code);
  const timeoutRef = useRef(null);
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("asdadas")
        try {
          const inputObj = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
            console.log("dasdasdas111111")
          addLocation(routeId, busId, inputObj);
        } catch (error) {}
      },
      (error) => {},
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    timeoutRef.current = setTimeout(getLocation, 15000);
  };

  useEffect(() => {
    if (busId) {
      getLocation();
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [busId]);
};

export default useLocation;

//thac mac
