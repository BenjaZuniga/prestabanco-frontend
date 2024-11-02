import * as React from 'react';
import requestSevice from '../services/request.service';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material';
import { FormControl, InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import documentService from '../services/document.service';
import Slider from '@mui/material/Slider';
import { CenterFocusStrong } from '@mui/icons-material';


export default function SimulateCreditForm() {
  const [amount, setAmount] = useState();
  const [interestRate, setInterestRate] = useState(5.5);
  const [months, setMonths] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  const simulateCredit = (e) => {
	  e.preventDefault(); 

	  const request = {amount: parseInt(amount, 10), 
		               interestRate: parseFloat(interestRate), 
									 months: parseInt(months, 10)};
  
	  console.log(request)
	  requestSevice
	    .simulateCredit(request)
	    .then((response) => {
	      console.log("Simulación exitosa", response.data);

		    setTotal(Math.round(response.data))
      })
	    .catch((error) => {
		    console.log("Simulación fallida", error)
      })
  }
  
	const marks = [
		{
			value: 3,
			label: '3%',
		},
		{
			value: 4,
			label: '4%',
		},
		{
			value: 5,
			label: '5%',
		},
		{
			value: 6,
			label: '6%',
		},
		{
			value: 7,
			label: '7%',
		},
		{
			value: 8,
			label: '8%',
		},
	];
  return(
	<Box
    component="form"
    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
    noValidate
    autoComplete="off"
		position={'static'}
		justifyContent={"center"}
  >
    <h3> Simulación de credito</h3>
		<Grid container  alignItems="center" rowGap="20px" >
      <br />
			<Grid item xs={10} md="6" >
			  <Typography>Monto:</Typography>
			</Grid>
			<Grid item xs={6} >
      <FormControl >
	      <TextField
            required
            label="Monto"
            id="amount-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
      </FormControl>
			</Grid>
			<br />

			<Grid item xs={6}>
			  <InputLabel id="monto">Total de meses:</InputLabel>
			</Grid>

			<Grid item xs={6}>
      <FormControl>
        <TextField
          required
          label="Total de meses "
          id="months-input"
          variant="filled"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
        />
      </FormControl>
			</Grid>
			<br />
			<Grid item xs={6}>
			  <Typography align='center'>Tasa de interes anual:      {interestRate}% </Typography> 
			</Grid>
			<Grid item xs={6}>
	    <FormControl fullWidth>
			  <Slider
          aria-label="Always visible"
          defaultValue={5.5}
					min={3}
					max={8}
          step={0.1}
          marks={marks}
					value={interestRate}
          valueLabelDisplay="off"
					onChange={(e) => setInterestRate(e.target.value)}
      />
      </FormControl>
			</Grid>
      <br />
			<Grid item xs={6}>
			  <Typography align='center'>Cuota mensual:</Typography>
			</Grid>
			<Grid item xs={6}>
			  <Typography align='center'>{total}</Typography>
			</Grid>
			</Grid>
			<br />
			<Button onClick={(e) => simulateCredit(e)}>Simular Credito</Button>
	</Box>)
}
