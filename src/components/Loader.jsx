import { createPortal } from "react-dom";
import { RotatingLines } from "react-loader-spinner";
import { useTheme } from "@emotion/react";

export const Loader = () => {
  const theme = useTheme();
  return createPortal(
    <div className="backdrop">
      <RotatingLines strokeColor={theme.palette.primary.main} />
    </div>,
    document.getElementById("loaderPortalDiv")
  );
};
