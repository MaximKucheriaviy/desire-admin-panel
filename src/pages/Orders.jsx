import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getAllOrders } from "../services/api";
import { useEffect, useState } from "react";
import { Order } from "../components/Order";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    (async () => {
      const result = await getAllOrders();
      setOrders(result);
    })();
  }, []);
  return (
    <Box>
      <Typography variant="h4">Замовлення</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Номер</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Замовник</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((item) => {
            return <Order order={item} key={item._id} />;
          })}
        </TableBody>
      </Table>
    </Box>
  );
};
