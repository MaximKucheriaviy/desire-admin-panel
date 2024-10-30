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
  TableBody,
  Paper,
  Checkbox,
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
  updateItemImage,
  getTopStyle,
  getBottomStyle,
  addImageToSet,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CloudUploadSharp from "@mui/icons-material/CloudUploadSharp";

import { ModalCreateStoreItem } from "../components/ModalCreateStoreItem";
import { SizesTableRow } from "../components/SizesTableRow";
import { styled } from "@mui/material/styles";
import { ImageSet } from "../components/ImageSet";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  const [update, setUpdate] = useState(true);
  const [topStyleList, setTopStyleList] = useState([]);
  const [bottomStyleList, setBottomStyleList] = useState([]);

  const [editNameMode, setEditNameMode] = useState(false);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const brands = await getAllBrands();
      const topStyles = await getTopStyle();
      const bottomStyle = await getBottomStyle();

      setTopStyleList(topStyles);
      setBottomStyleList(bottomStyle);
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
  }, [params.id, dispatch, update]);
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
    await updateItem(item._id, fields);
    setUpdate((prev) => !prev);
    dispatch(disableLoader());
  };

  if (!item.category._id) {
    return <></>;
  }

  const onMainImageSelect = async ({ target }) => {
    dispatch(enableLoader());
    const data = new FormData();
    data.append("imageId", item.image.id);
    data.append("Image", target.files[0]);
    await updateItemImage(item._id, data);
    setUpdate((prev) => !prev);
    dispatch(disableLoader());
  };

  const onImageSetImageSelect = async ({ target }) => {
    dispatch(enableLoader());
    const data = new FormData();
    data.append("Image", target.files[0]);
    await addImageToSet(item._id, data);
    setUpdate((prev) => !prev);
    dispatch(disableLoader());
  };
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
                <Grid size={4}>
                  <Typography variant="body2">Стиль верху</Typography>
                  <Checkbox
                    checked={item.topStyle ? true : false}
                    onChange={({ target }) => {
                      if (target.checked) {
                        inputHandler(topStyleList[0]._id, "topStyle");
                      } else {
                        inputHandler(null, "topStyle");
                      }
                    }}
                  />
                </Grid>
                <Grid size={8}>
                  <FormControl disabled={!item.topStyle} fullWidth>
                    <InputLabel id="topStyleLabel"></InputLabel>
                    <Select
                      labelId="topStyleLabel"
                      value={item.topStyle || ""}
                      onChange={({ target }) =>
                        inputHandler(target.value, "topStyle")
                      }
                    >
                      {topStyleList.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={4}>
                  <Typography variant="body2">Стиль низу</Typography>
                  <Checkbox
                    checked={item.bottomStyle ? true : false}
                    onChange={({ target }) => {
                      if (target.checked) {
                        inputHandler(bottomStyleList[0]._id, "bottomStyle");
                      } else {
                        inputHandler(null, "bottomStyle");
                      }
                    }}
                  />
                </Grid>
                <Grid size={8}>
                  <FormControl disabled={!item.bottomStyle} fullWidth>
                    <InputLabel id="bottomStyleLabel"></InputLabel>
                    <Select
                      labelId="bottomStyleLabel"
                      value={item.bottomStyle || ""}
                      onChange={({ target }) =>
                        inputHandler(target.value, "bottomStyle")
                      }
                    >
                      {bottomStyleList.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "20px",
              }}
              size={6}
            >
              <Box
                sx={{ border: "1px solid black", padding: "5px" }}
                width={"300px"}
              >
                <Box
                  height={(300 * 12) / 9}
                  sx={{
                    backgroundImage: `url(${item.image.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  display={"flex"}
                  justifyContent={"flex-end"}
                  alignItems={"flex-end"}
                >
                  <IconButton
                    component="label"
                    role={undefined}
                    variant="contained"
                    sx={{
                      color: "#ffffff",
                      border: "2px solid white",
                      borderRadius: "10px",
                    }}
                    tabIndex={-1}
                  >
                    <ModeEditOutlineIcon />
                    <VisuallyHiddenInput
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={onMainImageSelect}
                    />
                  </IconButton>
                </Box>
              </Box>
              <ImageSet
                update={setUpdate}
                id={item._id}
                imageSet={item.imageSet}
              />
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadSharp />}
              >
                Завантажити зображення
                <VisuallyHiddenInput
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={onImageSetImageSelect}
                />
              </Button>
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
                    <TableCell width={200}>
                      <Typography variant="body2">Розміри</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">Наявна кількість</Typography>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.storedItems.map((item, index) => (
                    <SizesTableRow
                      item={item}
                      key={item._id}
                      update={setUpdate}
                      index={index}
                    />
                  ))}
                </TableBody>
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
        update={setUpdate}
      />
    </Box>
  );
};
