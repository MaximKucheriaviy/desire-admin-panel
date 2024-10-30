import {
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  IconButton,
  Paper,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { getAllStyles, createStyle, deleteStyle } from "../services/api";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";

export const StylePage = () => {
  const [styleName, setStyleName] = useState("");
  const [styles, setStyles] = useState([]);
  const [type, setType] = useState("top");

  const dispatch = useDispatch();

  const createHandler = async () => {
    dispatch(enableLoader());
    const result = await createStyle(styleName, type);
    setStyles((prev) => [...prev, result]);
    dispatch(disableLoader());
  };
  const deleteStyleHandler = async (id) => {
    dispatch(enableLoader());
    await deleteStyle(id);
    setStyles((prev) => {
      return prev.filter((brand) => brand._id !== id);
    });
    dispatch(disableLoader());
  };
  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const result = await getAllStyles();
      setStyles(result);
      dispatch(disableLoader());
    })();
  }, [dispatch]);
  return (
    <Box>
      <Typography variant="h4">Стилі</Typography>
      <Box display={"flex"} gap={4} mt={4}>
        <TextField
          label="Новий стиль"
          value={styleName}
          autoComplete="false"
          onChange={({ target }) => setStyleName(target.value)}
        />
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Тип стилю
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={type}
            onChange={({ target }) => setType(target.value)}
          >
            <FormControlLabel
              value="top"
              control={<Radio />}
              label="Стиль верху"
            />
            <FormControlLabel
              value="bottom"
              control={<Radio />}
              label="Стиль низу"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Button onClick={createHandler} variant="contained">
        Створити
      </Button>
      <Box mt={4}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Назва стилю</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {styles.map((style) => (
                <TableRow key={style._id}>
                  <TableCell>{style.name}</TableCell>
                  <TableCell>
                    {style.type === "top" ? "Стиль низу" : "Стиль верху"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteStyleHandler(style._id)}>
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};
