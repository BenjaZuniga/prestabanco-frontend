import * as React from 'react';
import requestService from '../services/request.service';
import documentService from '../services/document.service';
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { styled } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect} from "react";

const RequestDetails = () => {
  const [request, setRequest] = useState(); 
	const [documents, setDocuments] = useState([])

	const firstPropertyDocumentsTypes = ["Comprobante de ingresos", "Certificado de avaluó", "Historial crediticio"]
	const secondPropertyDocumentsTypes = ["Comprobante de ingresos", "Certificado de avaluó", "Historial crediticio", "Escritura Primera Propiedad"]
	const bussinesPropertyDocumentsTypes = ["Comprobante de ingresos", "Certificado de avaluó", "Plan de negocios", "Estado financiero del negocio"]
	const remodDocumentsTypes = ["Comprobante de ingresos", "Certificado de avaluó actualizado", "Presupuesto de remodelación"]

	const {requestId} = useParams();
	const navigate = useNavigate();

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

	const formatNumber = (number) => {
		return new Intl.NumberFormat('de-DE').format(number);
	};


	const init = () => {
    requestService
      .get(requestId)
      .then((response) => {
        console.log("Solicitud obtenida correctamente.", response.data);
        setRequest(response.data);
				documentService
					  .getByRequestId(response.data.id)
						.then((documents)=>{
							console.log("Documentos obtenidos", documents.data)
							const documentsPdf = documents.data.map(document =>{
								documentsTypes.append(document.type)
								const byteChars =atob(document.data);
								const byteNumbers = Array.from(byteChars, char => char.charCodeAt(0))
								const byteArray = new Uint8Array(byteNumbers)
								const blob = new Blob([byteArray], {type: "application/pdf"})
								return { url : window.URL.createObjectURL(blob), type: document.type}
							})
							setDocuments(documentsPdf)
							console.log(documentsPdf, documentsTypes)

							
						})
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar obtener la solicitud.",
          error
        );
      });
  };

	useEffect(() => {
    init();
  }, []);

	const aprove = () => {
		console.log("Prestamo aprobado", request.id);

		const updatedRequest = {id: request.id, ownerId: request.ownerId, type: request.type,
			state: "En desembolso", amount: request.amount, interestRate: request.interestRate,
			months: request.months, propertyValue: request.propertyValue, monthlyFee: request.monthlyFee
			}

		requestService
			.update(updatedRequest)
			.then((response) => {
				console.log("Solicitud actualizada correctamente", response.data)
				navigate("/myRequests");
			})
			.catch((error)=> {
				console.log("Fallo al actualizar solicitud", error)
		})
	}

	return (

		<Box sx={{ flexGrow: 1 }}>
				<h1>Datos de la solicitud</h1>
				<Grid container spacing={15} rowGap={"20px"} alignItems={"center"}>
					<Grid size={6} textAlign={"right"}>
					  <Typography>Tipo de solicitud:</Typography>
					</Grid>
					<Grid size={6} textAlign={"left"}>
					  <Typography>{request?.type}</Typography>
					</Grid>
					<Grid size={6} textAlign={"right"}>
					  <Typography>Estado de la solicitud:</Typography>
					</Grid>
					<Grid size={6} textAlign={"left"}>
					  <Typography>{request?.state}</Typography>
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
					<Grid size={12} >
					{request?.state === "Pre-aprobado" || request?.state === "En desembolso" ? (
						<Grid container spacing={15} rowGap={"20px"} alignItems={"center"}>
							<Grid size={12} >
								<h2>Gastos totales</h2>
							</Grid>
							<Grid size={6} textAlign={"right"}>
								<Typography>Cuota mensual:</Typography>
							</Grid>
							<Grid size={6} textAlign={"left"}>
								<Typography>{formatNumber(Math.round(request?.monthlyFee))}$</Typography>
							</Grid>
							<Grid size={6} textAlign={"right"}>
								<Typography>Seguro desgravamen:</Typography>
							</Grid>
							<Grid size={6} textAlign={"left"}>
								<Typography>{formatNumber(Math.round(request?.amount * 0.0003))}$</Typography>
							</Grid>
							<Grid size={6} textAlign={"right"}>
								<Typography>Seguro de incendio:</Typography>
							</Grid>
							<Grid size={6} textAlign={"left"}>
								<Typography>{formatNumber(20000)}$</Typography>
							</Grid>
							<Grid size={6} textAlign={"right"}>
								<Typography>Comisión por administración:</Typography>
							</Grid>
							<Grid size={6} textAlign={"left"}>
								<Typography>{formatNumber(Math.round(request?.amount * 0.01))}$</Typography>
							</Grid>
							<Grid size={6} textAlign={"right"}>
								<Typography fontSize={24} fontWeight={"fontWeightBold"}>Costo mensual:</Typography>
							</Grid>
							<Grid size={6} textAlign={"left"}>
								<Typography fontSize={24} fontWeight={"fontWeightBold"}>{formatNumber(Math.round(request?.monthlyFee) + 20000 + Math.round(request?.amount * 0.0003))}$</Typography>
							</Grid>
							<Grid size={6} textAlign={"right"}>
								<Typography fontSize={24} fontWeight={"fontWeightBold"}>Costo total:</Typography>
							</Grid>
							<Grid size={6} textAlign={"left"}>
								<Typography fontSize={24} fontWeight={"fontWeightBold"}>{formatNumber((Math.round(request?.monthlyFee) + 20000 + Math.round(request?.amount * 0.0003))*request.months + Math.round(request?.amount * 0.01))}$</Typography>
							</Grid>
							<Grid size={12} textAlign={"center"}>
								<Button onClick={() => aprove()}>Aceptar prestamo</Button>
							</Grid>
						</Grid>
					): null}
					</Grid>
				</Grid>
				
			</Box>
		)


}

export default RequestDetails;