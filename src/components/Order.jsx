import { Box, Typography, TableRow, TableCell, Button } from "@mui/material";

export const Order = ({ order }) => {
  let BGColor = "white";
  switch (order.status) {
    case "В обробці":
      BGColor = "yellow";
      break;
    case "Відправлено":
      BGColor = "green";
      break;
    case "Завершено":
      BGColor = "white";
      break;
  }
  const date = new Date(order.date);
  return (
    <TableRow
      sx={{ backgroundColor: BGColor }}
      paddingTop={"20px"}
      paddingBottom={"20px"}
    >
      <TableCell>№{order.ordernNumber}</TableCell>
      <TableCell>
        {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
      </TableCell>
      <TableCell>
        {order.name} {order.sername}
      </TableCell>
      <TableCell>{order.phone}</TableCell>
      <TableCell>{order.status}</TableCell>
      <TableCell>
        <Button variant="contained">Детально</Button>
      </TableCell>
    </TableRow>
  );
};
