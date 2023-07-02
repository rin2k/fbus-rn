import { useEffect } from "react";
import { useSelector } from "react-redux";

const useLocation = () => {
  const id = useSelector((state) => state.task.id);

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
    setTimeout(getLocation, 15000);
  };

  useEffect(() => {
    if (id) {
      getLocation();
    }
  }, [id]);
};

export default useLocation;
