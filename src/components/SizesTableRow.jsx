import {
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  Collapse,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { enableLoader, disableLoader } from "../redux/slices";
import { deleteStoredItem, updateStoredItem } from "../services/api";
import { ModalCreateStoredItemSize } from "./ModalCreateSize";

export const SizesTableRow = ({ item, update, index }) => {
  const [open, setOpen] = useState(false);
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
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Box
            width={40}
            height={40}
            border="1px solid black"
            sx={{ backgroundColor: item.color }}
          ></Box>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{item.colorName}</Typography>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => deleteSTHandler(item._id, index)}>
            <DeleteForever />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2">Розмір</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">Кількість</Typography>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => setModalOpen((prev) => !prev)}>
                      Додати розмір
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.sizes.map((item, index) => (
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">{item.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item.count}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteSize(index)}>
                        <DeleteForever />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
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
