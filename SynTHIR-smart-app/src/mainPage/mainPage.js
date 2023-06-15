import { useEffect, useState } from "react";
import React from "react";
import { Table } from "@material-ui/core";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const MainPage = () => {
  const [syntheticFhirPatients, setSyntheticFhirPatients] = useState({cdsClientFHIRData:[]});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchUserData = () => {
    fetch("http://localhost:8084/api/v1/cds/client/get-fhir-resources?fhirServerUrl=https://synthir-hdl-server.azurehealthcareapis.com")
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((data) => setSyntheticFhirPatients(data));
    console.log(" hello there ");
   
    console.log(syntheticFhirPatients.cdsClientFHIRData);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  function onRowPressed(row) {

    handleClickOpen(); // remove this in final implementation
    console.log(row.API);
    fetch("/myserver.endpoint", {
      method: "POST",
      body: JSON.stringify({ row }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleClickOpen();

        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell align="right">County Number</TableCell>
              <TableCell align="right">Age Group</TableCell>
              <TableCell align="right">Diagnosis</TableCell>
              <TableCell align="right">ATC code</TableCell>
              <TableCell align="right">Discharge Location</TableCell>
              <TableCell align="right">Prescription category</TableCell>
              <TableCell align="right">Arrival Mode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              syntheticFhirPatients.cdsClientFHIRData.map((row) =>  
               (
               
                <TableRow
                  key={row.index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => onRowPressed(row)}
                >
                  <TableCell component="th" scope="row">
                    {row.prescribedDrugATCCode}
                  </TableCell>
                  <TableCell align="right">{row.patientGender}</TableCell>
                  <TableCell align="right">{row.patientCountyNumber}</TableCell>
                  <TableCell align="right">{row.patientAgeGroup}</TableCell>
                  <TableCell align="right">{row.mainDiagnosis}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
