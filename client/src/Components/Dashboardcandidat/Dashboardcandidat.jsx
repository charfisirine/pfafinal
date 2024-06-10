import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TableChartIcon from "@mui/icons-material/TableChart";

import { Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ResultatCandidat } from "./ResultatCandidat";
const drawerWidth = 250;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Dashboardcandidat = () => {
  const [chosenOption, seChosenOption] = useState("Liste des Examens Passée");

  const query = useQuery();
  const tab = query.get("tab");

  useEffect(() => {
    if (tab === "exam-list") {
      seChosenOption("Liste des Examens Passée ");
    }

  }, [tab]);

  const drawer = (
    <div>
      <List>
        <Divider className="divider" />
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              seChosenOption("Liste des Examens Passée");
            }}
          >
            <ListItemIcon>
              <TableChartIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary={"Liste des Examens Passée"} />
          </ListItemButton>
        </ListItem>
      </List>
      {/* <Divider /> */}
    </div>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "auto" }}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* la partie du sidebar */}
        <Drawer
          className="list"
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1976d2",
              // background: "linear-gradient(105deg, #6e99e6, #093c94)",
              color: "white",
              height: "69.2em",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
        {/* le code du  contenu a droite */}
        <Box
          className="content"
          component="main"
          sx={{
            alignItems: "start",

            // width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {chosenOption === "Liste des Examens Passée" && <ResultatCandidat />}

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboardcandidat;
