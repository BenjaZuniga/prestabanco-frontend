import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaidIcon from "@mui/icons-material/Paid";
import CalculateIcon from "@mui/icons-material/Calculate";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DiscountIcon from "@mui/icons-material/Discount";
import HailIcon from "@mui/icons-material/Hail";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import HomeIcon from "@mui/icons-material/Home";
import { ListAlt } from "@mui/icons-material";
import { AttachMoney, Checklist, ViewStream } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Sidemenu({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const listOptions = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider />

				{localStorage.getItem("logged") === "1" ?
				<>
        <ListItemButton onClick={() => navigate("/simulateCredit")}>
          <ListItemIcon>
            <AttachMoney />
          </ListItemIcon>
          <ListItemText primary="Simular credito" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/requestForm")}>
          <ListItemIcon>
            <ViewStream />
          </ListItemIcon>
          <ListItemText primary="Realizar solicitud" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/requestsList")}>
          <ListItemIcon>
            <Checklist />
          </ListItemIcon>
          <ListItemText primary="Evaluar solicitudes" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/myRequests")}>
          <ListItemIcon>
            <ListAlt />
          </ListItemIcon>
          <ListItemText primary="Mis solicitudes" />
        </ListItemButton>
				</>
				: null}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {listOptions()}
      </Drawer>
    </div>
  );
}
