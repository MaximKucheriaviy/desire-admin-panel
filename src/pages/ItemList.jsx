import {
  Typography,
  Box,
  Button,
  TableHead,
  Table,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { getAllItems } from "../services/api";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";

export const ItemsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      dispatch(enableLoader());
      const items = await getAllItems();
      setItems(items);
      dispatch(disableLoader());
    })();
  }, [dispatch]);
  return (
    <Box>
      <Typography variant="h4">Список товарів</Typography>
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
      </Box>
      <Button onClick={() => navigate("/createitem")} variant="contained">
        Створити
      </Button>
    </Box>
  );
};
