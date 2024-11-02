import * as React from 'react';
import userService from "../services/user.service"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LoginForm() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const login = (e) => {
	e.preventDefault();

	userService
	  .getByMail(mail)
		.then((response) => {
			console.log("Usuario obtenido.", response.data)
			setUser(response.data)
			if(user.password === password){
				localStorage.setItem("idUser", user.id);
				localStorage.setItem("role", user.role);
				localStorage.setItem("logged", 1);
			}
			navigate("/home")
		})
		.catch((error) => {
      console.log("Se ha producido un error.", error)
	  })

	  
  };

  return ( 
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}}
      noValidate
      autoComplete="off"
	
    >
	  <h3> Inicio de sesión</h3>
	  <br></br>
      <div>
        <TextField
		      required
          label="Correo" 
          id="mail-imput"
          variant="filled"
		      value={mail}
					onChange={(e) => setMail(e.target.value)}
        />
	  </div>
	  <br></br>
	  <div>
	  <TextField
		  required
      label='Contraseña'
      id='password-imput'
			value={password}
			
      type={showPassword ? "text" : "password"} // <-- This is where the magic happens
      InputProps={{ // <-- This is where the toggle button is added.
      endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
		
  }}
	onChange={(e) => setPassword(e.target.value)}
/>
      </div>
	  <br></br>
	  <div>
	  <Button onClick={(e) => login(e)}>Iniciar Sesión</Button>
	  </div>
	  <br></br>
	  <div>
		¿Aún no está registrado?
	  </div>
	  <br></br>
	  <div>
	  <Button onClick={() => navigate("/registerForm")}>Deseo Registrarme</Button>
	  </div>

    </Box>
  );
}
