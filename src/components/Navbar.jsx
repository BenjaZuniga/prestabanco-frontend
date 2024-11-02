import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidemenu from "./Sidemenu";
import { useState, useEffect } from "react";
import { Login } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logout from "../services/login.service"

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState()

  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  const init = () => {
    if (localStorage.getItem("logged")){
		setIsLoggedIn(1);
	}else{
		setIsLoggedIn(0);
	}
  };

  const  goToRegister = () => {
    navigate("/registerForm"); // Navegar a la página de registro
  };

  const  goToLogin = () => {
    navigate("/loginForm"); // Navegar a la página de registro
  };

  function logout(){
	localStorage.clear()
	navigate(0)
  }

  useEffect(() => {
    init()
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" top = "0px">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PrestaBanco  
          </Typography>
		  {(localStorage.getItem("logged") === "1") ? (
            <Button color="inherit" onClick={logout } >Cerrar sesión</Button>
		  ):(
			<>
		      <Button color="inherit" onClick={goToLogin } >Iniciar sesión</Button>
		      <Button color="inherit" onClick={goToRegister } >Registrarme</Button>
		   </>		
		  )} 
        </Toolbar>
      </AppBar>

      <Sidemenu open={open} toggleDrawer={toggleDrawer}></Sidemenu>
    </Box>
  );
}
