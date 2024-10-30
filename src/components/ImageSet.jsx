import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { deleteImageFromSet } from "../services/api";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";

export const ImageSet = ({ id, imageSet = [], update }) => {
  const dispatch = useDispatch();
  const deleteHandler = async (image) => {
    dispatch(enableLoader());
    await deleteImageFromSet(id, image);
    update((prev) => !prev);
    dispatch(disableLoader());
  };
  return (
    <Grid spacing={2} container>
      {imageSet.map((item) => (
        <Grid
          key={item._id}
          display="flex"
          flexDirection="column"
          alignItems="center"
          minWidth="70px"
          size={3}
        >
          <Box
            component={"button"}
            height={(70 * 12) / 9}
            width={70}
            sx={{
              backgroundImage: `url(${item.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid black",
              display: "block",
            }}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
          ></Box>
          <IconButton onClick={() => deleteHandler(item)}>
            <DeleteForever />
          </IconButton>
        </Grid>
      ))}
    </Grid>
  );
};
