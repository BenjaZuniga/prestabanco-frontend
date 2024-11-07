import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import requestService from "../services/request.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Visibility } from "@mui/icons-material";

const MyRequestsList = () => {
  const [requests, setRequests] = useState([]);
	

  const navigate = useNavigate();

	const formatNumber = (number) => {
		return new Intl.NumberFormat('de-DE').format(number);
	};

	const init = () => {
    requestService
      .getByOwnerId(localStorage.getItem("idUser"))
      .then((response) => {
        console.log("Mostrando listado de todas mis solicitudes.", response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todas mis solicitudes.",
          error
        );
      });
  };

	useEffect(() => {
    init();
  }, []);

	const declineRequest = (request) => {
		console.log("Solicitud cancelada", request.id);

		const updatedRequest = {id: request.id, ownerId: request.ownerId, type: request.type,
			state: "Cancelado por el usuario", amount: request.amount, interestRate: request.interestRate,
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

	const viewRequestDetails = (id) => {
    navigate(`/requestDetails/${id}`);
  };


  return (
    <TableContainer component={Paper}>
      <br />
			<h1>Mis solicitudes</h1>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
						<TableCell align="center" sx={{ fontWeight: "bold" }}>
              Tipo de prestamo
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Valor de la propiedad
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Monto solicitado
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Tasa de interes anual
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Plazo
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Estado
            </TableCell>
						<TableCell align="center" sx={{ fontWeight: "bold" }}>
              Ver detalles
            </TableCell>
						<TableCell align="center" sx={{ fontWeight: "bold" }}>
              Cancelar solicitud
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
						<TableRow
							key={request.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							style={{backgroundColor: request.state === "Rechazado" || request.state === "Cancelado por el usuario" ? "#f35050": 
																			 request.state === "Pre-aprobado" ? "lightgreen" : request.state === "Pendiente de Documentación" ? "lightgray" : 
																			 request.state === "En desembolso" ? "lightblue" :null}}
						>
							<TableCell align="center">{request.type}</TableCell>
							<TableCell align="center">{formatNumber(request.propertyValue)}</TableCell>
							<TableCell align="center">{formatNumber(request.amount)}</TableCell>
							<TableCell align="center">{request.interestRate}%</TableCell>
							<TableCell align="center">{request.months}</TableCell>
							<TableCell align="center">{request.state}</TableCell>
							
							<TableCell>
								<Button
									size="small"
									onClick={() => viewRequestDetails(request.id)}
									style={{ marginLeft: "0.5rem", color:"black" }}
									startIcon={<Visibility />}
								>
									Ver detalles
								</Button>
							</TableCell>
            
						
						<TableCell>
						{request.state === "Rechazado" || request.state === "Cancelado por el usuario" || request.state === "En desembolso" ? null : (
								<Button
									size="small"
									onClick={() => declineRequest(request)}
									style={{ marginLeft: "0.5rem", color:"black" }}
									startIcon={<DeleteIcon />}
								>
									Cancelar
								</Button>
								)}
							</TableCell>
						
						</TableRow>	
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyRequestsList;
