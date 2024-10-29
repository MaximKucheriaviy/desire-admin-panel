import {
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  Modal,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";
import { createStoredItem } from "../services/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalCreateStoreItem = ({
  modalState,
  setModalState,
  itemID,
  update,
}) => {
  const [color, setColor] = useState("#ffffff");
  const [colorName, setColorname] = useState("");

  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      dispatch(enableLoader());
      await createStoredItem({
        itemID,
        color,
        colorName,
      });
      setModalState((prev) => !prev);
      update((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
    dispatch(disableLoader());
  };

  return (
    <Modal open={modalState}>
      <Box sx={style}>
        <Typography variant="h4">Додати колір</Typography>
        <Grid spacing={2} container>
          <Grid size={6}>
            <Box
              width="70px"
              height="70px"
              sx={{ backgroundColor: color }}
            ></Box>
          </Grid>
          <Grid size={6}>
            <HexColorPicker color={color} onChange={setColor} />
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                alue={colorName}
                onChange={({ target }) => setColorname(target.value)}
                label="Назва кольору"
              />
            </FormControl>
          </Grid>

          <Grid size={4}>
            <Button
              disabled={!color || !colorName}
              onClick={onSubmit}
              variant="contained"
            >
              Створити
            </Button>
          </Grid>
          <Grid size={8}>
            <Button
              onClick={() => setModalState((prev) => !prev)}
              variant="outlined"
            >
              Назад
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
