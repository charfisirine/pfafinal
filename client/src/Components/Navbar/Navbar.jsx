import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { BiCertification } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogout } from "../connexion/connexionSaga";

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, type } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);

  return (
    <AppBar style={{ height: "6rem" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BiCertification
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 5,
            ml: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          CertiAvance 
        </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Recherche Examen
            </Button>
            {type === "formateur" && (
              <Button
                onClick={() => {
                  navigate("/CreerExamen");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                creez Examen
              </Button>
            )}
            {type === "formateur" && (
              <Button
                onClick={() => {
                  navigate("/CreerQuestions");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                creez Question
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {token ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                    }}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt=""
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => {
                    setOpen(false);
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate(`/Dashboard${type}`);
                    }}
                  >
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      dispatch(postLogout({ token, type }));
                      navigate("/");
                    }}
                  >
                    <Typography textAlign="center">Déconnexion</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => {
                  navigate("/connexion");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Connexion
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
