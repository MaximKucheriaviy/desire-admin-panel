import {
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getItemByID,
  deleteItem,
  updateItem,
  getAllBrands,
  getTypes,
  getCategories,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { ModalCreateStoreItem } from "../components/ModalCreateStoreItem";

export const ItemEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    category: {
      id: null,
    },
  });
  const dispatch = useDispatch();

  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  const [editNameMode, setEditNameMode] = useState(false);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const brands = await getAllBrands();
      setBrandList(brands);
      dispatch(disableLoader());
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const categories = await getCategories();
      setCategoryList(categories);
      dispatch(disableLoader());
    })();
  }, [dispatch]);
  useEffect(() => {
    if (!item.category._id) {
      return;
    }
    (async () => {
      dispatch(enableLoader());
      const types = await getTypes(item.category._id);
      setTypeList(types);
      dispatch(disableLoader());
    })();
  }, [item.category._id, dispatch]);

  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const brands = await getAllBrands();
      setBrandList(brands);
      dispatch(disableLoader());
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const item = await getItemByID(params.id);
      setItem(item);
      dispatch(disableLoader());
    })();
  }, [params.id, dispatch]);
  const onDelete = async () => {
    await deleteItem(params.id);
    navigate("/items");
  };
  const chageHandler = async (value, field) => {
    setItem((prev) => {
      const obj = { ...prev };
      obj[field] = value;
      return obj;
    });
  };
  const inputHandler = async (value, field) => {
    dispatch(enableLoader());
    const fields = {};
    fields[field] = value;
    const result = await updateItem(item._id, fields);
    setItem(result);
    dispatch(disableLoader());
  };
  console.log(item);

  if (!item.category._id) {
    return <></>;
  }
  return (
    <Box>
      <Paper>
        <Box padding={4}>
          <Grid mt={4} container>
            <Grid size={6}>
              <Grid spacing={3} container>
                <Grid size={10}>
                  {editNameMode ? (
                    <TextField
                      label="Назва"
                      value={item.name}
                      onChange={({ target }) =>
                        chageHandler(target.value, "name")
                      }
                    />
                  ) : (
                    <Typography variant="h5">{item.name}</Typography>
                  )}
                </Grid>
                <Grid size={2}>
                  <IconButton
                    onClick={() => {
                      setEditNameMode((prev) => !prev);
                      inputHandler(item.name, "name");
                    }}
                  >
                    <ModeEditOutlineIcon />
                  </IconButton>
                </Grid>
                <Grid size={2}>
                  <Typography variant="body2">Катeгорія:</Typography>
                </Grid>
                <Grid size={10}>
                  <FormControl fullWidth>
                    <InputLabel id="categoryLabel">Категорія</InputLabel>
                    <Select
                      labelId="categoryLabel"
                      label="Категорія"
                      value={item.category._id}
                      onChange={({ target }) =>
                        inputHandler(target.value, "category")
                      }
                    >
                      {categoryList.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={2}>
                  <Typography variant="body2">Тип:</Typography>
                </Grid>
                <Grid size={10}>
                  <FormControl
                    fullWidth
                    error={item.category._id !== item.type.category}
                  >
                    <InputLabel id="typeLabel">Тип</InputLabel>
                    <Select
                      labelId="typeLabel"
                      label="Тип"
                      value={item.type._id}
                      onChange={({ target }) =>
                        inputHandler(target.value, "type")
                      }
                    >
                      {typeList.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={2}>
                  <Typography variant="body2">Бренд:</Typography>
                </Grid>
                <Grid size={10}>
                  <FormControl fullWidth>
                    <InputLabel id="brandLable">Бренд</InputLabel>
                    <Select
                      labelId="brandLable"
                      label="Бренд"
                      value={item.brand._id}
                      onChange={({ target }) =>
                        inputHandler(target.value, "brand")
                      }
                    >
                      {brandList.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={2}>
                  <Typography variant="body2">Ціна:</Typography>
                </Grid>
                <Grid size={10}>
                  <TextField
                    type="number"
                    value={item.price}
                    onChange={({ target }) =>
                      chageHandler(target.value, "price")
                    }
                    onBlur={({ target }) =>
                      inputHandler(target.valueAsNumber, "price")
                    }
                  />
                </Grid>

                <Grid mt={4} size={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Опис"
                      value={item.description}
                      onChange={({ target }) =>
                        chageHandler(target.value, "description")
                      }
                      multiline
                      onBlur={({ target }) =>
                        inputHandler(target.value, "description")
                      }
                      rows={10}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
              size={6}
            >
              <Box
                sx={{ border: "1px solid black", padding: "5px" }}
                width={"300px"}
              >
                <img src={item.image.url} alt="cover" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Box mt={4}>
        <Paper>
          <Box padding={4}>
            <Typography variant="h5">В наявності</Typography>
            <Box mt={2}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2">Колір</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">Назва кольору</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">Розміри</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">Наявна кількість</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
            <Box mt={4}>
              <Button
                onClick={() => setModalState((prev) => !prev)}
                variant="contained"
              >
                Додати
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box>
        <Button onClick={onDelete} color="warning" variant="contained">
          Видалити
        </Button>
      </Box>
      <ModalCreateStoreItem
        modalState={modalState}
        setModalState={setModalState}
        itemID={params.id}
      />
    </Box>
  );
};
