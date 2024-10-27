import { Typography, Box, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemByID, deleteItem } from "../services/api";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
export const ItemEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  useEffect(() => {
    (async () => {
      const item = await getItemByID(params.id);
      setItem(item);
    })();
  }, [params.id]);
  const onDelete = async () => {
    await deleteItem(params.id);
    navigate("/items");
  };
  if (!item) {
    return <></>;
  }
  return (
    <Box>
      <Grid mt container>
        <Grid size={6}>
          <Typography variant="h4">{item.name}</Typography>
          <Grid mt={4} container>
            <Grid size={2}>
              <Typography variant="body2">Катeгорія:</Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">{item.category.name}</Typography>
            </Grid>
            <Grid size={2}>
              <IconButton>
                <ModeEditOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid size={2}>
              <Typography variant="body2">Тип:</Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">{item.type.name}</Typography>
            </Grid>
            <Grid size={2}>
              <IconButton>
                <ModeEditOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid size={2}>
              <Typography variant="body2">Бренд:</Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">{item.brand.name}</Typography>
            </Grid>
            <Grid size={2}>
              <IconButton>
                <ModeEditOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid size={2}>
              <Typography variant="body2">Ціна:</Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">{item.price}грн</Typography>
            </Grid>
            <Grid size={2}>
              <IconButton>
                <ModeEditOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center" }} size={6}>
          <Box
            sx={{ border: "1px solid black", padding: "5px" }}
            width={"300px"}
          >
            <img src={item.image.url} alt="cover" />
          </Box>
        </Grid>
      </Grid>

      <Box>
        <Button onClick={onDelete} color="warning" variant="contained">
          Видалити
        </Button>
      </Box>
    </Box>
  );
};
