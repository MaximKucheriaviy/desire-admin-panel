import { TableRow, TableCell, IconButton, Typography } from "@mui/material";
import { useState } from "react";

import DeleteForever from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";
import { deleteStoredItem, updateStoredItem } from "../services/api";
import { ModalCreateStoredItemSize } from "./ModalCreateSize";

export const SizesTableRow = ({ item, update, index }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const deleteSTHandler = async (id, index) => {
    dispatch(enableLoader());
    await deleteStoredItem(id);
    update((prev) => !prev);
    dispatch(disableLoader());
  };

  const deleteSize = async (index) => {
    try {
      dispatch(enableLoader());
      const { sizes } = item;
      sizes.splice(index, 1);
      await updateStoredItem(item._id, { sizes });
      update((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
    dispatch(disableLoader());
  };
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Typography variant="body1">{item.article}</Typography>
        </TableCell>
        <TableCell>{item.barcode}</TableCell>

        <TableCell>
          <Typography variant="body1">{item.size}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body1">{item.count}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{item.priceUSD}</Typography>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => deleteSTHandler(item._id, index)}>
            <DeleteForever />
          </IconButton>
        </TableCell>
      </TableRow>

      <ModalCreateStoredItemSize
        modalState={modalOpen}
        setModalState={setModalOpen}
        update={update}
        item={item}
      />
    </>
  );
};
