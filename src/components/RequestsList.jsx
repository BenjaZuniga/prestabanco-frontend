import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import requestService from "../services/request.service";
import userService from "../services/user.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RequestsList = () => {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

	const formatNumber = (number) => {
		return new Intl.NumberFormat('de-DE').format(number);
	};

	const init = () => {
    requestService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todas las solicitudes.", response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todas las solicitudes.",
          error
        );
      });
  };

	useEffect(() => {
    init();
  }, []);

	const evaluate = (id) => {
    console.log("Evaluar solicitud", id);
    navigate(`/evaluateRequest/${id}`);
  };


  return (
    <TableContainer component={Paper}>
      <br />
			<h1>Solicitudes</h1>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
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
              Evaluar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
						<TableRow
							key={request.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell align="center">{request.type}</TableCell>
							<TableCell align="center">{formatNumber(request.propertyValue)}</TableCell>
							<TableCell align="center">{formatNumber(request.amount)}</TableCell>
							<TableCell align="center">{request.interestRate}%</TableCell>
							<TableCell align="center">{request.months}</TableCell>
							<TableCell align="center">{request.state}</TableCell>
							<TableCell>
							{ request.state === "En evaluación" ? (
								<Button
									variant="contained"
									color="info"
									size="small"
									onClick={() => evaluate(request.id)}
									style={{ marginLeft: "0.5rem" }}
									startIcon={<EditIcon />}
								>
									Evaluar
								</Button>
								) : null}
							</TableCell>  
						</TableRow>	
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RequestsList;
