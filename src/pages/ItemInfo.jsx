import { Typography, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemByID, deleteItem } from "../services/api";
import { useNavigate } from "react-router-dom";

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
      <Typography variant="h4">{item.name}</Typography>
      <Box>
        <Button onClick={onDelete} color="warning" variant="contained">
          Видалити
        </Button>
      </Box>
    </Box>
  );
};
