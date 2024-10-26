import {
  TableRow,
  TableCell,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <TableRow>
      <TableCell>
        <Box width={100}>
          <img src={item.image.url} alt="item" />
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{item.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{item.price}</Typography>
      </TableCell>
      <TableCell>{item.brand.name}</TableCell>
      <TableCell>{item.category.name}</TableCell>
      <TableCell>{item.type.name}</TableCell>
      <TableCell>
        <IconButton onClick={() => navigate(`/edititem/${item._id}`)}>
          <PlaylistPlayIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
