import {
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  FormControl,
  Modal,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Fragment } from "react";
import ClearIcon from "@mui/icons-material/Clear";

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

export const ModalCreateStoreItem = ({ modalState, setModalState, itemID }) => {
  const [color, setColor] = useState("#ffffff");
  const [colorName, setColorname] = useState("");
  const [count, setCount] = useState(0);

  const [sizeList, setSizeList] = useState([]);

  const [size, setSize] = useState("");

  return (
    <Modal open={modalState}>
      <Box sx={style}>
        <Grid spacing={2} container>
          <Grid size={6}>
            <Typography variant="body2">Колір</Typography>
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
          <Grid size={6}>
            <TextField
              label="Додати розмір"
              value={size}
              onChange={({ target }) => setSize(target.value)}
            />
          </Grid>
          <Grid size={6}>
            <Button
              onClick={() => {
                setSizeList((prev) => [...prev, size]);
              }}
              variant="contained"
            >
              Додати розмір
            </Button>
          </Grid>
          <Grid size={12}>
            <Typography variant="body2">Розміри</Typography>
            <Grid container>
              {sizeList.map((item, index) => (
                <Fragment key={index}>
                  <Grid display="flex" alignItems="center" size={8}>
                    {item}
                  </Grid>
                  <Grid size={2}>
                    <IconButton
                      onClick={() =>
                        setSizeList((prev) => {
                          const arr = [...prev];
                          arr.splice(index, 1);
                          return arr;
                        })
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                value={count}
                onChange={({ target }) => setCount(target.value)}
                label="кількість"
                type="number"
              />
            </FormControl>
          </Grid>
          <Grid size={4}>
            <Button
              onClick={() => setModalState((prev) => !prev)}
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
