import * as React from 'react';
import requestService from '../services/request.service';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled, Typography } from '@mui/material';
import { FormControl, InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import documentService from '../services/document.service';

export default function RequestForm(){
	const [propertyValue, setPropertyValue] = useState("");
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
	const [type, setType] = useState("");
	
	const [state, setState] = useState("En Revisión Inicial");
	const interestRate = 5;
	const ownerId = localStorage.getItem("idUser");
	var requestId;
  const [incomeDocument, setincomeDocument] = useState();
	const [propertyValueDocument, setPropertyValueDocument] = useState()
  const [creditHistoryDocument, setCreditHistoryDocument] = useState();
  const [firstPropertyDocument, setFirstPropertyDocument] = useState();
	const [businessStateDocument, setBusinessStateDocument] = useState();
	const [businessPlanDocument, setBuissnesPlanDocument] = useState();
	const [budgetDocument, setBudgetDocument] = useState();
	const [propertyValueActDocument, setPropertyValueActDocument] = useState()
	const [validParams, setValidPams] = useState(false);
	const [validMonths, setValidMonths] = useState(false);

	const navigate = useNavigate()
  
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
   if((propertyValue !== "") && (amount !== "") && (months !== "") && type !==""){
		  setValidPams(true)
			switch(type){
				case "Primera vivienda" :
				  if(incomeDocument === undefined || propertyValueDocument === undefined || creditHistoryDocument === undefined){
            setState("Pendiente de Documentación");	
					}else{
						setState("En evaluación")
					}
					break;
				case "Segunda vivienda" :
				  if(incomeDocument === undefined || propertyValueDocument === undefined || firstPropertyDocument === undefined || creditHistoryDocument === undefined){
            setState("Pendiente de Documentación");	
					}else{
						setState("En evaluación")
					}
					break;
				case "Propiedades comerciales" :
				  if(incomeDocument === undefined || propertyValueDocument === undefined || businessStateDocument === undefined || businessPlanDocument === undefined){
            setState("Pendiente de Documentación");
					}else{
						setState("En evaluación")
					}
					break;
				case "Remodelación" :
				  if(incomeDocument === undefined || propertyValueActDocument === undefined || budgetDocument === undefined){
            setState("Pendiente de Documentación");	
					}else{
						setState("En evaluación")
					}
					break;
			}
		}else{
			window.alert("Falta rellenar un campo")
			return;
		}
	}

	const checkMonths = (e) => {
		switch(type){
			case "Primera vivienda" :
				if(parseInt(months) > 360){
					setValidMonths(false);	
				}else{
					setValidMonths(true)
				}
				break;
			case "Segunda vivienda" :
				case "Primera vivienda" :
				if(parseInt(months) > 240){
					setValidMonths(false);	
				}else{
					setValidMonths(true)
				}
				break;
			case "Propiedades comerciales" :
				if(parseInt(months) > 300){
					setValidMonths(false);	
				}else{
					setValidMonths(true)
				}
			case "Remodelación" :
				if(parseInt(months) > 180){
					setValidMonths(false);	
				}else{
					setValidMonths(true)
				}
	}
}

	const uploadFirstPropertyDocuments = async () => {
		if (incomeDocument !== undefined) {
			const incomeDocumentData = new FormData();
			incomeDocumentData.append('file', incomeDocument); // Archivo PDF
			incomeDocumentData.append('requestId', requestId); // ID de la solicitud
			incomeDocumentData.append('type', "Comprobante de ingresos"); // Tipo de documento
			try {
				const response = await documentService.create(incomeDocumentData);
				console.log("Comprobante de ingresos creado correctamente", response.data, incomeDocumentData);
			} catch (error) {
				console.log("Ha ocurrido un error al intentar crear comprobante de ingresos.", error, incomeDocumentData);
			}
		}
		if (propertyValueDocument !== undefined) {
			const propertyValueDocumentData = new FormData();
			propertyValueDocumentData.append('file', propertyValueDocument); // Archivo PDF
			propertyValueDocumentData.append('requestId', requestId); // ID de la solicitud
			propertyValueDocumentData.append('type', "Certificado de avaluó"); // Tipo de documento
			try {
				const response = await documentService.create(propertyValueDocumentData);
				console.log("Certificado de avaluó creado correctamente", response.data);
			} catch (error) {
				console.log("Ha ocurrido un error al intentar crear certificado de avaluó", error);
			}
		}
		if (creditHistoryDocument !== undefined) {
			const creditHistoryDocumentData = new FormData();
			creditHistoryDocumentData.append('file', creditHistoryDocument); // Archivo PDF
			creditHistoryDocumentData.append('requestId', requestId); // ID de la solicitud
			creditHistoryDocumentData.append('type', "Historial crediticio"); // Tipo de documento
			try {
				const response = await documentService.create(creditHistoryDocumentData);
				console.log("Historial crediticio creado correctamente", response.data);
			} catch (error) {
				console.log("Ha ocurrido un error al intentar crear historial crediticio", error);
			}
		}
		window.alert("Solicitud creada exitosamente")
		navigate("/myRequests")
	};


	const uploadSecondPropertyDocuments = async () => {
		if (incomeDocument !== undefined) {
			const incomeDocumentData = new FormData();
			incomeDocumentData.append('file', incomeDocument); // Archivo PDF
			incomeDocumentData.append('requestId', requestId); // ID de la solicitud
			incomeDocumentData.append('type', "Comprobante de ingresos"); // Tipo de documento
			try {
				const response = await documentService.create(incomeDocumentData);
				console.log("Comprobante de ingresos creado correctamente", response.data, incomeDocumentData);
			} catch (error) {
				console.log("Ha ocurrido un error al intentar crear comprobante de ingresos.", error, incomeDocumentData);
			}
		}
		if (propertyValueDocument !== undefined) {
			const propertyValueDocumentData = new FormData();
			propertyValueDocumentData.append('file', propertyValueDocument); // Archivo PDF
			propertyValueDocumentData.append('requestId', requestId); // ID de la solicitud
			propertyValueDocumentData.append('type', "Certificado de avaluó"); // Tipo de documento
			try {
				const response = await documentService.create(propertyValueDocumentData);
				console.log("Certificado de avaluó creado correctamente", response.data);
			} catch (error) {
				console.log("Ha ocurrido un error al intentar crear certificado de avaluó", error);
			}
		}
		if (creditHistoryDocument !== undefined) {
			const creditHistoryDocumentData = new FormData();
			creditHistoryDocumentData.append('file', creditHistoryDocument); // Archivo PDF
			creditHistoryDocumentData.append('requestId', requestId); // ID de la solicitud
			creditHistoryDocumentData.append('type', "Historial crediticio"); // Tipo de documento
			try {
				const response = await documentService.create(creditHistoryDocumentData);
				console.log("Historial crediticio creado correctamente", response.data);
			}catch (error) {
				console.log("Ha ocurrido un error al intentar crear historial crediticio", error);
			}
		}
		if (firstPropertyDocument !== undefined) {
			const firstPropertyDocumentData = new FormData();
			firstPropertyDocumentData.append('file', firstPropertyDocument); // Archivo PDF
			firstPropertyDocumentData.append('requestId', requestId); // ID de la solicitud
			firstPropertyDocumentData.append('type', "Escritura Primera Propiedad"); // Tipo de documento
			try {
				const response = await documentService.create(firstPropertyDocumentData);
				console.log("Escritura Primera Propiedad creado correctamente", response.data);
			}catch (error) {
				console.log("Ha ocurrido un error al intentar crear Escritura Primera Propiedad", error);
			}
		}
		window.alert("Solicitud creada exitosamente")
		navigate("/myRequests")

	}

	const uploadComercialPropertyDocuments = async () => {
		if (incomeDocument !== undefined) {
			const incomeDocumentData = new FormData();
			incomeDocumentData.append('file', incomeDocument); // Archivo PDF
			incomeDocumentData.append('requestId', requestId); // ID de la solicitud
			incomeDocumentData.append('type', "Comprobante de ingresos"); // Tipo de documento
			try {
				const response = await documentService.create(incomeDocumentData);
				console.log("Comprobante de ingresos creado correctamente", response.data, incomeDocumentData);
			} catch (error) {
				console.log("Ha ocurrido un error al intentar crear comprobante de ingresos.", error, incomeDocumentData);
			}
		}
		if (propertyValueDocument !== undefined) {
			const propertyValueDocumentData = new FormData();
			propertyValueDocumentData.append('file', propertyValueDocument); // Archivo PDF
			propertyValueDocumentData.append('requestId', requestId); // ID de la solicitud
			propertyValueDocumentData.append('type', "Certificado de avaluó"); // Tipo de documento
			try {
				const response = await documentService.create(propertyValueDocumentData);
				console.log("Certificado de avaluó creado correctamente", response.data);
			} catch (error) {
				console.log("Ha ocurrido un error al intentar crear certificado de avaluó", error);
			}
		}
		if (businessPlanDocument !== undefined) {
			const businessPlanDocumentData = new FormData();
			businessPlanDocumentData.append('file', businessPlanDocument); // Archivo PDF
			businessPlanDocumentData.append('requestId', requestId); // ID de la solicitud
			businessPlanDocumentData.append('type', "Plan de negocios"); // Tipo de documento
			try {
				const response = await documentService.create(businessPlanDocumentData);
				console.log("Plan de negocios creado correctamente", response.data);
			}catch (error) {
				console.log("Ha ocurrido un error al intentar crear plan de negocios", error);
			}
		}
		if (businessStateDocument !== undefined) {
			const businessStateDocumentData = new FormData();
			businessStateDocumentData.append('file', businessStateDocument); // Archivo PDF
			businessStateDocumentData.append('requestId', requestId); // ID de la solicitud
			businessStateDocumentData.append('type', "Estado financiero del negocio"); // Tipo de documento
			try {
				const response = await documentService.create(businessStateDocumentData);
				console.log("Estado financiero del negocio creado correctamente", response.data);
			}catch (error) {
				console.log("Ha ocurrido un error al intentar crear estado financiero del negocio", error);
			}
		}
		window.alert("Solicitud creada exitosamente")
		navigate("/myRequests")
	}

	const uploadRemodDocuments = async () => {
		if (incomeDocument !== undefined) {
			const incomeDocumentData = new FormData();
			incomeDocumentData.append('file', incomeDocument); // Archivo PDF
			incomeDocumentData.append('requestId', requestId); // ID de la solicitud
			incomeDocumentData.append('type', "Comprobante de ingresos"); // Tipo de documento
			try {
				const response = await documentService.create(incomeDocumentData);
				console.log("Comprobante de ingresos creado correctamente", response.data, incomeDocumentData);
			} catch (error) {
				console.log("Ha ocurrido un error al intentar crear comprobante de ingresos.", error, incomeDocumentData);
			}
		}
		if (propertyValueActDocument !== undefined) {
			const propertyValueActDocumentData = new FormData();
			propertyValueActDocumentData.append('file', propertyValueActDocument); // Archivo PDF
			propertyValueActDocumentData.append('requestId', requestId); // ID de la solicitud
			propertyValueActDocumentData.append('type', "Certificado de avaluó"); // Tipo de documento
			try {
				const response = await documentService.create(propertyValueActDocumentData);
				console.log("Certificado de avaluó actualizado creado correctamente", response.data);
			} catch (error) {
				console.log("Ha ocurrido un error al intentar crear certificado de avaluó actualizado", error);
			}
		}
		if (budgetDocument !== undefined) {
			const budgetDocumentData = new FormData();
			budgetDocumentData.append('file', budgetDocument); // Archivo PDF
			budgetDocumentData.append('requestId', requestId); // ID de la solicitud
			budgetDocumentData.append('type', "Presupuesto de remodelación"); // Tipo de documento
			try {
				const response = await documentService.create(budgetDocumentData);
				console.log("Presupuesto de remodelación creado correctamente", response.data);
			} catch (error) {
				console.log("Ha ocurrido un error al intentar crear presupuesto de remodelación", error);
			}
		}
		window.alert("Solicitud creada exitosamente")
		navigate("/myRequests")

	}

	const saveRequest = (e) => {
		e.preventDefault();

		checkParams(e);
		checkMonths(e);

		if(validParams && validMonths){

		setAmount(parseInt(amount))
		setPropertyValue(parseInt(propertyValue));
		setMonths(parseInt(months))

		const request = {ownerId, type, state, amount, interestRate, months, propertyValue}

		requestService
		  .create(request)
			.then((response) => {
				console.log("Solicutud realizada correctamente", response.data)
				requestId = response.data.id
				switch(type){
					case "Primera vivienda" :
						uploadFirstPropertyDocuments();
						break;
					case "Segunda vivienda":
						uploadSecondPropertyDocuments();
						break;
					case "Propiedades comerciales":
						uploadComercialPropertyDocuments();
						break;
					case "Remodelación":
						uploadRemodDocuments();
						break;
				}})
			
			.catch((error) => {
				console.log("Fallo al realizar la solicitud", error)
			})
		}else{
			window.alert("Datos erroneos")
		}
	}
	
	return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <h1> Solicitud de prestamo</h1>
      <br />
      <FormControl fullWidth>
        <InputLabel id="rol">Tipo de prestamo</InputLabel>
        <Select
          required
          id="-select"
          value={type}
          label="Tipo de prestamo"
          onChange={(e) => setType(e.target.value)}
        >
		      <MenuItem value={""}>Seleccione una opción</MenuItem>
          <MenuItem value={"Primera vivienda"}>Primera vivienda</MenuItem>
          <MenuItem value={"Segunda vivienda"}>Segunda vivienda</MenuItem>
          <MenuItem value={"Propiedades comerciales"}>Propiedades comerciales</MenuItem>
					<MenuItem value={"Remodelación"}>Remodelación</MenuItem>
        </Select>
      </FormControl>
      <br /><br />
      <div>
        <FormControl fullWidth>
          <TextField
            required
            label="Valor de la propiedad"
            id="propertyValue-input"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
          />
        </FormControl>
      </div>
      <br />
			<div>
        <FormControl fullWidth>
          <TextField
					  required
            label="Monto del prestamo"
            id="amount-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>
      </div>
      <br />
      <div>
        <FormControl fullWidth>
          <TextField
					  required
            label="Cantidad de meses"
            id="months-input"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </FormControl>
      </div>
			<br />
			<div>
        <FormControl fullWidth>
          <Typography>Tasa de interés: 5%</Typography>
        </FormControl>
      </div>
      <br />
			{type === "Primera vivienda" ? (
				<>
        <div>
					<Button
						component="label"
						role={undefined}
						variant="contained"
						tabIndex={-1}
						startIcon={<CloudUploadIcon />}
					>
						Subir comprobante de ingresos
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setincomeDocument(e.target.files[0])} // Cambia a e.target.files[0]
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
						Subir certificado de avaluó
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setPropertyValueDocument(e.target.files[0])} // Cambia a e.target.files[0]
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
						Subir historial crediticio
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setCreditHistoryDocument(e.target.files[0])} // Cambia a e.target.files[0]
						/>
					</Button>
				</div>
				</>
			):type === "Segunda vivienda" ? (
				<>
				<div>
					<Button
						component="label"
						role={undefined}
						variant="contained"
						tabIndex={-1}
						startIcon={<CloudUploadIcon />}
					>
						Subir comprobante de ingresos
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setincomeDocument(e.target.files[0])} // Cambia a e.target.files[0]
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
						Subir certificado de avaluó
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setPropertyValueDocument(e.target.files[0])} // Cambia a e.target.files[0]
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
						Subir escritura de la primera vivienda
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setFirstPropertyDocument(e.target.files[0])} // Cambia a e.target.files[0]
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
						Subir historial crediticio
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setCreditHistoryDocument(e.target.files[0])} // Cambia a e.target.files[0]
						/>
					</Button>
				</div>
				</>
			) : type === "Propiedades comerciales" ? (
				<>
				<div>
					<Button
						component="label"
						role={undefined}
						variant="contained"
						tabIndex={-1}
						startIcon={<CloudUploadIcon />}
					>
						Subir comprobante de ingresos
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setincomeDocument(e.target.files[0])} // Cambia a e.target.files[0]
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
						Subir certificado de avaluó
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setPropertyValueDocument(e.target.files[0])} // Cambia a e.target.files[0]
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
						Subir estado financiero del negocio
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setBusinessStateDocument(e.target.files[0])} // Cambia a e.target.files[0]
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
						Subir plan de negocios
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setBuissnesPlanDocument(e.target.files[0])} // Cambia a e.target.files[0]
						/>
					</Button>
				</div>
				</>	
			): type === "Remodelación" ? (
				<>
				<div>
					<Button
						component="label"
						role={undefined}
						variant="contained"
						tabIndex={-1}
						startIcon={<CloudUploadIcon />}
					>
						Subir comprobante de ingresos
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setincomeDocument(e.target.files[0])} // Cambia a e.target.files[0]
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
						Subir certificado de avaluó actualizado
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setPropertyValueActDocument(e.target.files[0])} // Cambia a e.target.files[0]
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
						Subir presupuesto de la remodelación
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setBudgetDocument(e.target.files[0])} // Cambia a e.target.files[0]
						/>
					</Button>
				</div>
				</>	
			): null}
      <br />
      <div>
        <Button onClick={(e) => saveRequest(e)}>Solicitar Prestamo</Button>
      </div>
      
    </Box>
  );

}