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
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { getAllBrands, createBrand, deleteBrand } from "../services/api";

export const BrandPage = () => {
  const [brandName, setBrandName] = useState("");
  const [brands, setBrands] = useState([]);
  const createHandler = async () => {
    const result = await createBrand(brandName);
    if (!result) {
      return;
    }
    setBrands((prev) => {
      return [...prev, result];
    });
  };
  const deleteBrandHandler = async (id) => {
    await deleteBrand(id);
    setBrands((prev) => {
      return prev.filter((brand) => brand._id !== id);
    });
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllBrands();
        setBrands(data);
        setBrandName("");
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <Box>
      <Typography variant="h4">Бренд</Typography>
      <Box display={"flex"} gap={4} mt={4}>
        <TextField
          label="Новий бренд"
          value={brandName}
          autoComplete="false"
          onChange={({ target }) => setBrandName(target.value)}
        />
        <Button
          onClick={createHandler}
          disabled={!brandName}
          variant="contained"
        >
          Створити
        </Button>
      </Box>
      <Box mt={4}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Назва бренду</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand._id}>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteBrandHandler(brand._id)}>
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
