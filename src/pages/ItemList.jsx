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
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { ItemCard } from "../components/ItemCard";
import {
  getAllItems,
  getCategories,
  getTypes,
  uploadNewItems,
} from "../services/api";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";
import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
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

export const ItemsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [typeList, setTypeList] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();

  const chagePage = (event, value) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value);
    setSearchParams(params);
  };

  const inputHandler = async (value, field) => {
    const params = new URLSearchParams(searchParams);
    if (field === "category") {
      params.delete("type");
    }
    if (!value || value === "all") {
      params.delete(field);
    } else {
      params.set(field, value);
    }
    params.set("page", 1);
    setSearchParams(params);
  };

  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const items = await getAllItems(searchParams);
      setItems(items.data);
      setPageCount(items.totalPages);
      dispatch(disableLoader());
    })();
  }, [dispatch, searchParams, setSearchParams]);

  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const cat = await getCategories();
      cat.unshift({ _id: "", name: "Всі" });
      setCategoryList(cat);
      dispatch(disableLoader());
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (!searchParams.get("category")) {
        return;
      }
      dispatch(enableLoader());
      const type = await getTypes(searchParams.get("category"));
      type.unshift({ _id: "", name: "Всі" });
      setTypeList(type);
      dispatch(disableLoader());
    })();
  }, [dispatch, searchParams]);

  const onCSVGETSelect = async ({ target }) => {
    dispatch(enableLoader());
    const data = new FormData();
    data.append("data", target.files[0]);
    const result = await uploadNewItems(data);
    console.log(result);

    dispatch(disableLoader());
    NotificationManager.info(
      `Завантаено: ${result.uploaded}\n Помилки: ${result.errorUpload}\n Дублювання${result.barcodeDuplicate}\n`
    );
  };

  return (
    <Box>
      <NotificationContainer />
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
        <Grid size={3}>
          <FormControl disabled={!searchParams.get("category")} fullWidth>
            <InputLabel id="typeLabel">Тип</InputLabel>
            <Select
              labelId="typeLabel"
              label="Тип"
              value={searchParams.get("type") || ""}
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
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={2}
      >
        <Button onClick={() => navigate("/createitem")} variant="contained">
          Створити
        </Button>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadSharp />}
        >
          Додати позиції
          <VisuallyHiddenInput
            type="file"
            accept=".csv"
            onChange={onCSVGETSelect}
          />
        </Button>
      </Box>
    </Box>
  );
};
