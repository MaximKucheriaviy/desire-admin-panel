import { Typography, Box, Button, TextField, Modal } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";
import { updateStoredItem } from "../services/api";

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

export const ModalCreateStoredItemSize = ({
  modalState,
  setModalState,
  update,
  item,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  const onSubmit = async () => {
    try {
      dispatch(enableLoader());
      const { sizes } = item;
      sizes.push({ name, count });
      await updateStoredItem(item._id, { sizes });
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
        <Typography variant="h4">Додати розмір</Typography>
        <Grid mt={4} spacing={1} container>
          <Grid size={6}>
            <TextField
              value={name}
              onChange={({ target }) => setName(target.value)}
              label="Розмір"
            />
          </Grid>
          <Grid size={6}>
            <TextField
              value={count}
              onChange={({ target }) => setCount(target.value)}
              label="Кількість"
              type="number"
            />
          </Grid>
          <Grid size={3}>
            <Button
              onClick={onSubmit}
              disabled={!name || !count}
              variant="contained"
            >
              Додати
            </Button>
          </Grid>
          <Grid size={3}>
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
