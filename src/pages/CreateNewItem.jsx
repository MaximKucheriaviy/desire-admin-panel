import {
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  getAllBrands,
  getCategories,
  getTypes,
  createItem,
} from "../services/api";
import CloudUploadSharp from "@mui/icons-material/CloudUploadSharp";
import { styled } from "@mui/material/styles";

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

export const CreateItemPage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0.0);

  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    (async () => {
      const brands = await getAllBrands();
      setBrandList(brands);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      setCategoryList(categories);
    })();
  }, []);
  useEffect(() => {
    if (!category) {
      return;
    }
    (async () => {
      const types = await getTypes(category);
      setTypeList(types);
    })();
  }, [category]);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("category", category);
    data.append("type", type);
    data.append("brand", brand);
    data.append("Image", image);
    data.append("price", price);

    const item = await createItem(data);
    console.log(item);
  };
  return (
    <Box>
      <Typography variant="h4">Створити новий товар</Typography>
      <Box width={500} mt={4}>
        <FormControl fullWidth>
          <TextField
            value={name}
            onChange={({ target }) => setName(target.value)}
            label="Назва"
          />
        </FormControl>
      </Box>
      <Box width={300} mt={4}>
        <FormControl fullWidth>
          <TextField
            type="number"
            value={price}
            onChange={({ target }) => setPrice(target.value)}
            label="Ціна"
          />
        </FormControl>
      </Box>
      <Box width={300} mt={4}>
        <FormControl fullWidth>
          <InputLabel>Бренд</InputLabel>
          <Select
            value={brand}
            onChange={({ target }) => setBrand(target.value)}
          >
            {brandList.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box width={300} mt={4}>
        <FormControl fullWidth>
          <InputLabel>Категорія</InputLabel>
          <Select
            value={category}
            onChange={({ target }) => setCategory(target.value)}
          >
            {categoryList.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box width={300} mt={4}>
        <FormControl disabled={!category} fullWidth>
          <InputLabel>Тип</InputLabel>
          <Select value={type} onChange={({ target }) => setType(target.value)}>
            {typeList.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box mt={4}>
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
            onChange={({ target }) => setImage(target.files[0])}
          />
        </Button>
        {image && <Typography variant="body1">{image.name}</Typography>}
      </Box>
      <Box mt={4}>
        <Button
          variant="contained"
          disabled={!name || !type || !image || !category || !brand || !price}
          onClick={onSubmit}
        >
          Створити
        </Button>
      </Box>
    </Box>
  );
};
