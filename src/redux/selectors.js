import { useSelector } from "react-redux";

export const useLoader = () => {
  return useSelector((state) => state.loader.value);
};
