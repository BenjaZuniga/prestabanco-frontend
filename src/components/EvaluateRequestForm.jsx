import * as React from 'react';
import requestService from '../services/request.service';
import documentService from '../services/document.service';
import userService from '../services/user.service';
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';
import { Check, DisabledByDefault } from '@mui/icons-material';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect} from "react";


const EvaluateRequestForm = () => {
  const [request, setRequest] = useState();
	const [user, setUser] = useState();
	const [documents, setDocuments] = useState([])

	var firstRule = false;
	const [secondRule, setSecondtRule] = useState(false);
	const [thirdRule, setThirdtRule] = useState(false);
	const [fourthRule, setFourthtRule] = useState(false);
	var fifthRule = false;
	const [sixthtRule, setSixthRule] = useState(false);
	var seventhRule = false;

	const [eighthRule, setEighthRule] = useState(false);
	const [ninethRule, setNinethRule] = useState(false);
	const [tenthRule, setTenthRule] = useState(false);
	const [eleventhRule, setEleventhRule] = useState(false);
	const [twelfthRule, setTwelfthRule] = useState(false);

	const navigate = useNavigate()
	
	var newState ="";
	var checks = 0;

	const { requestId } = useParams();

	const init = async () => {
    requestService
		  .get(requestId)
			.then((request) => {
				console.log("Solicitud obtenida", request.data)
				setRequest(request.data)
				userService
				  .get(request.data.ownerId)
					.then((user)=> {
					  console.log("Usuario obtenido", user.data)
					  setUser(user.data)
				  })
				  .catch((error)=> {
					  console.log("Fallo al obtener solicitud", error)
				  })
					documentService
					  .getByRequestId(request.data.id)
						.then((documents)=>{
							console.log("Documentos obtenidos", documents.data)
							const documentsPdf = documents.data.map(document =>{
								const byteChars =atob(document.data);
								const byteNumbers = Array.from(byteChars, char => char.charCodeAt(0))
								const byteArray = new Uint8Array(byteNumbers)
								const blob = new Blob([byteArray], {type: "application/pdf"})
								return { url : window.URL.createObjectURL(blob), type: document.type}
							})
							setDocuments(documentsPdf)
							console.log(documentsPdf)
						})
				})
			.catch((error)=> {
				console.log("Fallo al obtener solicitud", error)
			})
	}

	const downloadFile = (url, type) => {
		// Crea un enlace y haz clic en él para iniciar la descarga
		const link = document.createElement('a');
		link.href = url;
		link.download = `document.${type}`; // Puedes cambiar el nombre y la extensión del archivo
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link); // Limpia el DOM
  };

	const checkFirstRule = () => {
		const ratio = Math.round(request?.monthlyFee / user?.salary * 100);
		if (ratio > 35){
			firstRule = false
		}else{
			firstRule = true
		}
		
	}

	const checkFifthRule = () => {
		switch(request.type){
			case "Primera vivienda":
				if(request.amount / request.propertyValue <= 0.8){
					fifthRule = true
				}
				break;
			case "Segunda vivienda":
				if(request.amount / request.propertyValue <= 0.7){
					fifthRule = true
				}
				break;

			case "Propiedades comerciales":
				if(request.amount / request.propertyValue <= 0.6){
					fifthRule = true
				}
				break;

			case "Remodelación":
				if(request.amount / request.propertyValue <= 0.5){
					fifthRule = true
				}
				break;
		}
			
	}

	const checkSeventhRule = () => {
		if(eighthRule){
			checks++
		}
		if(ninethRule){
			checks++
		}
		if(tenthRule){
			checks++
		}
		if(eleventhRule){
			checks++
		}
		if(twelfthRule){
			checks++
		}
		if(checks > 2){
			seventhRule = true;
		}
	}

	const formatNumber = (number) => {
		return new Intl.NumberFormat('de-DE').format(number);
	};

	const evaluate = () => {
		checkFirstRule();
		checkFifthRule();
		checkSeventhRule();

		if(firstRule && secondRule && thirdRule && fourthRule && fifthRule && sixthtRule && seventhRule){
			if(checks === 3){
				newState = "Requiere evaluación adicional" 
			}
			if(checks === 5){
				newState = "Pre-aprobado"
			}

			const updatedRequest = {id: request.id, ownerId: request.ownerId, type: request.type,
															state: newState, amount: request.amount, interestRate: request.interestRate,
															months: request.months, propertyValue: request.propertyValue, monthlyFee: request.monthlyFee
			}
			requestService
			  .update(updatedRequest)
				.then((response) => {
					console.log("Solicitud actualizada correctamente", response.data)
					navigate("/requestsList")
				})
				.catch((error)=> {
					console.log("Fallo al actualizar solicitud", error)
				})
		}else{
			
			const updatedRequest = {id: request.id, ownerId: request.ownerId, type: request.type,
															state: "Rechazado", amount: request.amount, interestRate: request.interestRate,
															months: request.months, propertyValue: request.propertyValue, monthlyFee: request.monthlyFee
															}

			requestService
				.update(updatedRequest)
				.then((response) => {
					console.log("Solicitud actualizada correctamente", response.data)
					navigate("/requestsList")
				})
				.catch((error)=> {
					console.log("Fallo al actualizar solicitud", error)
				})
		}
	}
  
	useEffect(() => {
    init();
  }, []);

	return (
		
		<Box sx={{ flexGrow: 1 }}>
			<h1>Evaluación de solicitud</h1>
      <Grid container spacing={15} rowGap={"20px"} alignItems={"center"}>
				<Grid size={12}>
					<h2>Datos de la solicitud:</h2>
				</Grid>
				<Grid size={6} textAlign={"right"}>
					  <Typography>Tipo de solicitud:</Typography>
					</Grid>
					<Grid size={6} textAlign={"left"}>
					  <Typography>{request?.type}</Typography>
					</Grid>
					<Grid size={6} textAlign={"right"}>
					  <Typography>Valor de la propiedad:</Typography>
					</Grid>
					<Grid size={6} textAlign={"left"}>
					  <Typography>{formatNumber(request?.propertyValue)}$</Typography>
					</Grid>
					<Grid size={6} textAlign={"right"}>
					  <Typography>Monto Solicitado:</Typography>
					</Grid>
					<Grid size={6} textAlign={"left"}>
					  <Typography>{formatNumber(request?.amount)}$</Typography>
					</Grid>
					<Grid size={6} textAlign={"right"}>
					  <Typography>Plazo de la solicitud:</Typography>
					</Grid>
					<Grid size={6} textAlign={"left"}>
					  <Typography>{request?.months} meses</Typography>
					</Grid>
					<Grid size={6} textAlign={"right"}>
					  <Typography>Tasa de interes anual:</Typography>
					</Grid>
					<Grid size={6} textAlign={"left"}>
					  <Typography>{request?.interestRate}%</Typography>
					</Grid>
					<Grid size={6} textAlign={"right"}>
					  <Typography>Cuota mensual:</Typography>
					</Grid>
					<Grid size={6} textAlign={"left"}>
					  <Typography>{formatNumber(Math.round(request?.monthlyFee))}$</Typography>
					</Grid>
					<Grid size={12}>
						<h2>Datos y documentos del cliente:</h2>
					</Grid>
					<Grid size={6} textAlign={"right"}>
						<Typography>Edad del cliente:</Typography>
					</Grid>
					<Grid size={6} textAlign={"left"}>
					  <Typography>{user?.age}</Typography>
					</Grid>
					<Grid size={6} textAlign={"right"}>
					  <Typography>Ingresos mensuales del cliente:</Typography>
					</Grid>
					<Grid size={6} textAlign={"left"}>
					  <Typography>{formatNumber(Math.round(user?.salary))}$</Typography>
					</Grid>
					{documents.map((document, index) => (
            <Grid size={12} key={index}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => downloadFile(document.url, document.type)}
              >
                Descargar {document.type}
              </Button>
							<br />
            </Grid>
          ))}
				
				<Grid size={12}>
					<h2>Reglas de evaluación:</h2>
				</Grid>
        <Grid size={6} textAlign={"right"}>
          <Typography>Relación cuota/ingreso: </Typography>
        </Grid>
        <Grid size={6} textAlign={"left"}>
				  <Typography>{Math.round(request?.monthlyFee / user?.salary * 100)}%</Typography>
        </Grid>
        <Grid size={6} textAlign={"right"}>
				  <Typography>Historial crediticio del cliente:</Typography>
        </Grid>
        <Grid size={6} textAlign={"left"}>
			  	<Checkbox icon={<DisabledByDefault style={{color:'red'}}/>} checkedIcon={<Check style={{color:'green'}}/>} checked={secondRule} onChange={(e) => setSecondtRule(e.target.checked)}>
					</Checkbox>
        </Grid>
				<Grid size={6} textAlign={"right"}>
				  <Typography>Antiguedad laboral y Estabilidad:</Typography>
        </Grid>
        <Grid size={6} textAlign={"left"} >
					<Checkbox icon={<DisabledByDefault style={{color:'red'}}/>} checkedIcon={<Check style={{color:'green'}}/>} checked={thirdRule} onChange={(e) => setThirdtRule(e.target.checked)}>
					</Checkbox>
        </Grid>
				<Grid size={6} textAlign={"right"}>
				  <Typography>Relación deuda/ingreso:</Typography>
        </Grid>
        <Grid size={6} textAlign={"left"} >
					<Checkbox icon={<DisabledByDefault style={{color:'red'}}/>} checkedIcon={<Check style={{color:'green'}}/>} checked={fourthRule} onChange={(e) => setFourthtRule(e.target.checked)}>
					</Checkbox>
        </Grid>
				<Grid size={6} textAlign={"right"}>
				  <Typography>Monto máximo de financiamiento:</Typography>
        </Grid>
        <Grid size={6} textAlign={"left"}>
				  <Typography>{Math.round((request?.amount / request?.propertyValue ) * 100)}%</Typography>
        </Grid>
				<Grid size={6} textAlign={"right"}>
				  <Typography>Edad del solicitante:</Typography>
        </Grid>
        <Grid size={6} textAlign={"left"}>
					<Checkbox icon={<DisabledByDefault style={{color:'red'}}/>} checkedIcon={<Check style={{color:'green'}}/>} checked={sixthtRule} onChange={(e) => setSixthRule(e.target.checked)}>
					</Checkbox>
        </Grid>
				<Grid size={12}>
				<h3>Capacidad de ahorro:</h3>
				</Grid>
				<Grid size={6} textAlign={"right"}>
				  <Typography>Saldo minimo requerido:</Typography>
        </Grid>
        <Grid size={6} textAlign={"left"}>
					<Checkbox icon={<DisabledByDefault style={{color:'red'}}/>} checkedIcon={<Check style={{color:'green'}}/>} checked={eighthRule} onChange={(e) => setEighthRule(e.target.checked)}>
					</Checkbox>
        </Grid>
				<Grid size={6} textAlign={"right"}>
				  <Typography>Historial de ahorro consistente:</Typography>
        </Grid>
        <Grid size={6} textAlign={"left"}>
					<Checkbox icon={<DisabledByDefault style={{color:'red'}}/>} checkedIcon={<Check style={{color:'green'}}/>} checked={ninethRule} onChange={(e) => setNinethRule(e.target.checked)}>
					</Checkbox>
        </Grid>
				<Grid size={6} textAlign={"right"}>
				  <Typography>Depositos periódicos:</Typography>
        </Grid>
        <Grid size={6} textAlign={"left"}>
					<Checkbox icon={<DisabledByDefault style={{color:'red'}}/>} checkedIcon={<Check style={{color:'green'}}/>} checked={tenthRule} onChange={(e) => setTenthRule(e.target.checked)}>
					</Checkbox>
        </Grid>
				<Grid size={6} textAlign={"right"}>
				  <Typography>Relación saldo años de antiguedad:</Typography>
        </Grid>
        <Grid size={6} textAlign={"left"}>
					<Checkbox icon={<DisabledByDefault style={{color:'red'}}/>} checkedIcon={<Check style={{color:'green'}}/>} checked={eleventhRule} onChange={(e) =>setEleventhRule(e.target.checked)}>
					</Checkbox>
        </Grid>
				<Grid size={6} textAlign={"right"}>
				  <Typography>Retiros recientes:</Typography>
        </Grid>
        <Grid size={6} textAlign={"left"}>
					<Checkbox icon={<DisabledByDefault style={{color:'red'}}/>} checkedIcon={<Check style={{color:'green'}}/>} checked={twelfthRule} onChange={(e) => setTwelfthRule(e.target.checked)}>
					</Checkbox>
        </Grid>
				<Grid size={12} textAlign={"center"}>
				  <Button onClick={() => evaluate()}>Evaluar</Button>
        </Grid>
      </Grid>
    </Box>
	)
}

export default EvaluateRequestForm;