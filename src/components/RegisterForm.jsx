import * as React from 'react';
import userService from '../services/user.service';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material';
import { FormControl, InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import documentService from '../services/document.service';

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState(0);
  const [rut, setRut] = useState("");
  const [mail, setMail] = useState("");
	const [age, setAge] = useState("");
	const [salary, setSalary] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const [personalDocument, setPersonalDocument] = useState(null);
  const [salaryDocument, setSalaryDocument] = useState(null);
  var [personalDocumentId, setPersonalDocumentId] = useState();
  var [salaryDocumentId, setSalaryDocumentId] = useState();
	const [validParams, setValidParams] = useState(false);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

	const checkParams = (e) => {
		if(role !== 0 && name !== "" && rut !== "" && mail !== "" && age !== "" && salary !== "" && password !== "" && number !== ""){
			setValidParams(true);
			return;
		}else{
			window.alert("Falta rellenar información")
		}
	}

  const saveUser = async (e) => {
    e.preventDefault();

    checkParams(e);

	  const exists = (await userService.existsByMail(mail)).data;

	  if(exists && validParams){
		  window.alert("Ya existe un usuario con ese nombre")
	  }else{
      const uploadDocuments = async () => {
        if (personalDocument !== null) {
          const personalDocumentData = new FormData();
          personalDocumentData.append('file', personalDocument); // Archivo PDF
          personalDocumentData.append('requestId', 0); // ID de la solicitud
          personalDocumentData.append('type', "Documento personal"); // Tipo de documento
          try {
            const pD = await documentService.create(personalDocumentData);
            console.log("Documento personal creado correctamente", pD.data);
            personalDocumentId = pD.data.id;
          } catch (error) {
            console.log("Ha ocurrido un error al intentar crear documento personal.", error.response.data);
          }
        }

        if (salaryDocument !== null) {
          const salaryDocumentData = new FormData();
          salaryDocumentData.append('file', salaryDocument); // Archivo PDF
          salaryDocumentData.append('requestId', 0); // ID de la solicitud
          salaryDocumentData.append('type', "Documento de sueldo"); // Tipo de documento
          try {
            const sD = await documentService.create(salaryDocumentData);
            console.log("Documento de salario creado correctamente", sD.data);
            salaryDocumentId = sD.data.id;
          } catch (error) {
            console.log("Ha ocurrido un error al intentar crear documento de salario", error);
          }
        }
      };

			setAge(parseInt(age, 10))
			setSalary(parseInt(salary, 10))

      uploadDocuments().then(() => {
        const user = { name, age, salary, rut, role, number, mail, password, personalDocumentId, salaryDocumentId};
        userService.create(user)
          .then((response) => {
            console.log("Usuario creado correctamente", response.data);
            navigate('/loginForm'); // Navega a otra ruta si es necesario
          })
          .catch((error) => {
            console.log("Ha ocurrido un error al intentar crear nuevo usuario.", error);
          });
      });
    };
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <h3> Creación de cuenta</h3>
      <br />
      <FormControl fullWidth>
        <InputLabel id="rol">Rol</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Rol"
          onChange={(e) => setRole(e.target.value)}
        >
		      <MenuItem value={0}>Seleccione una opción</MenuItem>
          <MenuItem value={1}>Administrador</MenuItem>
          <MenuItem value={2}>Cliente</MenuItem>
          <MenuItem value={3}>Ejecutivo</MenuItem>
        </Select>
      </FormControl>
      <br /><br />
      <div>
        <FormControl fullWidth>
          <TextField
            required
            label="Nombre"
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
      </div>
      <br />
			<div>
        <FormControl fullWidth>
          <TextField
					  required
            label="Edad"
            id="age-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </FormControl>
      </div>
      <br />
      <div>
        <FormControl fullWidth>
          <TextField
					  required
            label="Rut"
            id="rut-input"
            helperText="xx.xxx.xxx-x"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth>
          <TextField
					  required
            label="Ingresos mensuales"
            id="salary-input"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </FormControl>
      </div>
			<br />
      <div>
        <FormControl fullWidth>
          <TextField
					  required
            label="Numero de telefono"
            id="number-input"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormControl>
      </div>
      <br />
      <div>
        <FormControl fullWidth>
          <TextField
            required
            label="Correo"
            id="mail-input"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </FormControl>
      </div>
      <br />
      <div>
        <FormControl fullWidth>
          <TextField
            required
            label="Contraseña"
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </div>
      <br />
      <div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Subir documento de salario
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => setSalaryDocument(e.target.files[0])} // Cambia a e.target.files[0]
          />
        </Button>
      </div>
      <br />
      <div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Subir documento personal
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => setPersonalDocument(e.target.files[0])} // Cambia a e.target.files[0]
          />
        </Button>
      </div>
      <br />
      <div>
        <Button onClick={(e) => saveUser(e)}>Crear Cuenta</Button>
      </div>
    </Box>
  );
}

