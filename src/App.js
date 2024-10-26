import { AppBar, Drawer, Toolbar, List, Box } from "@mui/material";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { NavigationButton } from "./components/NavigationButton";
import { Routes, Route } from "react-router-dom";
import { OrdersPage } from "./pages/Orders";
import { BrandPage } from "./pages/Brand";
import { ItemsPage } from "./pages/ItemList";
import { CreateItemPage } from "./pages/CreateNewItem";
import { ItemEdit } from "./pages/ItemInfo";

const drawerWidth = 240;

function App() {
  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>Desire адмін панель</Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <List>
            <NavigationButton
              Icon={FilterFramesIcon}
              text={"Замовлення"}
              path="/"
            />
            <NavigationButton
              Icon={EventNoteIcon}
              text={"Товари"}
              path="/items"
            />
            <NavigationButton
              Icon={AddToDriveIcon}
              text={"Бренд"}
              path="/brand"
            />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Routes>
            <Route element={<OrdersPage />} path="/" />
            <Route element={<BrandPage />} path="/brand" />
            <Route element={<ItemsPage />} path="/items" />
            <Route element={<CreateItemPage />} path="/createitem" />
            <Route element={<ItemEdit />} path="/edititem/:id" />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
