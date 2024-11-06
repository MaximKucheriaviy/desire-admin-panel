import {
  Typography,
  Box,
  Button,
  TableHead,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Pagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { getAllItems, getCategories } from "../services/api";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";
import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";

export const ItemsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  let [searchParams, setSearchParams] = useSearchParams();

  const chagePage = (event, value) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value);
    setSearchParams(params);
  };

  const inputHandler = async (value, field) => {
    const params = new URLSearchParams(searchParams);
    if (!value || value === "all") {
      params.delete(field);
    } else {
      params.set(field, value);
    }
    setSearchParams(params);
  };

  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const items = await getAllItems(searchParams);
      const cat = await getCategories();
      cat.unshift({ _id: "", name: "Всі" });
      setCategoryList(cat);
      setItems(items.data);
      setPageCount(items.totalPages);
      dispatch(disableLoader());
    })();
  }, [dispatch, searchParams]);

  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const cat = await getCategories();
      cat.unshift({ _id: "", name: "Всі" });
      setCategoryList(cat);
      dispatch(disableLoader());
    })();
  }, []);
  return (
    <Box>
      <Typography variant="h4">Список товарів</Typography>
      <Grid container>
        <Grid size={3}>
          <FormControl fullWidth>
            <InputLabel id="categoryLabel">Категорія</InputLabel>
            <Select
              labelId="categoryLabel"
              label="Категорія"
              value={searchParams.get("category") || ""}
              onChange={({ target }) => inputHandler(target.value, "category")}
            >
              {categoryList.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <FormControl
            fullWidth
            error={item.category._id !== item.type.category}
          >
            <InputLabel id="typeLabel">Тип</InputLabel>
            <Select
              labelId="typeLabel"
              label="Тип"
              value={item.type._id}
              onChange={({ target }) => inputHandler(target.value, "type")}
            >
              {typeList.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "100px" }}></TableCell>
              <TableCell>Назва</TableCell>
              <TableCell>Ціна</TableCell>
              <TableCell>Бренд</TableCell>
              <TableCell>Категорія</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Інфо</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <ItemCard item={item} key={item._id} />
            ))}
          </TableBody>
        </Table>
        <Box>
          <Pagination
            onChange={chagePage}
            count={pageCount}
            page={Number.parseInt(searchParams.get("page")) || 1}
          />
        </Box>
      </Box>
      <Button onClick={() => navigate("/createitem")} variant="contained">
        Створити
      </Button>
    </Box>
  );
};
