import { ListItem, ListItemIcon, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const NavigationButton = ({ Icon, text, path = "/" }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <NavLink to={path} style={{ color: "black", textDecoration: "none" }}>
        <Typography variant="subtitle2">{text}</Typography>
      </NavLink>
    </ListItem>
  );
};
