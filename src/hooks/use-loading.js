import { changeLoading } from "@/redux";
import { useDispatch } from "react-redux";

const useLoading = () => {
  const dispatch = useDispatch();
  const changeLoadingStatus = (isLoading) => {
    dispatch(changeLoading(isLoading));
  };

  const showLoading = () => {
    changeLoadingStatus(true);
  };

  const hideLoading = () => {
    changeLoadingStatus(false);
  };

  return { showLoading, hideLoading };
};

export default useLoading;
