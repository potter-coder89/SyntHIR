import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { Table } from "@material-ui/core";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

export const OnStartSynthir = (props) => {
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [patientResourceID, setPatientResourceID] = useState("");
  const [encounterResourceID, setEncounterResourceID] = useState(false);
  const [status, setStatus] = useState(false);
  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [atcDrugCode, setAtcDrugCode] = useState("");
  const [medicationIdentifier, setMedicationIdentifier] = useState("");
  const [encounterData, setEncounterData] = useState([]);
  const [conditionData, setConditionData] = useState([]);
  const [prescriptionType, setPrescriptionType] = useState("");
  const [finalResult, setfinalResult] = useState("");

  const accessToken = props.accessToken;
  const patientId = "";

  const fetchPatientResource = () => {
    //gender, birthDate, state, patientResourceID
    fetch(
      "https://synthir-test-fhir-server.azurehealthcareapis.com/Patient/" +
        patientId,
      { method: "GET", headers: { Authorization: "Bearer " + accessToken } }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGender(data.gender);
        setBirthDate(data.birthDate);
        setPostalCode(data?.address[0].postalCode);
        setPatientResourceID(data.id);
      });
  };

  const fetchEncounterResource = () => {
    //status, encounterResourceID
    const fetchEncounterResourceAPIUrl =
      "https://synthir-test-fhir-server.azurehealthcareapis.com/Encounter?patient=" +
      patientResourceID;
    fetch(fetchEncounterResourceAPIUrl, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEncounterData(data.entry);
      });
  };

  const fetchConditionResource = (encounterDataRow) => {
    //diagnosisCode
    const fetchEncounterResourceAPIUrl =
      "https://synthir-test-fhir-server.azurehealthcareapis.com/Condition?patient=" +
      patientId +
      "&encounter=" +
      encounterDataRow.resource.id;
    fetch(fetchEncounterResourceAPIUrl, {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setConditionData(data.entry);
        setEncounterResourceID(encounterDataRow.resource.id);
        setStatus(encounterDataRow.resource.status);
      });
  };

  // only used in case 1
  const fetchMedicationRequestResource = () => {
    //medicationResourceUrl
    const fetchMedicationRequestResourceAPIUrl =
      "https://synthir-test-fhir-server.azurehealthcareapis.com/MedicationRequest?encounter=" +
      encounterResourceID;
    fetch(fetchMedicationRequestResourceAPIUrl, {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMedicationIdentifier(
          data.entry[0].resource.medicationReference.identifier.value
        );
        setPrescriptionType(data.entry[0].resource.category[0].coding[0].code);
      })
      .then(() => {
        if (medicationIdentifier) fetchMedicationResource();
      });
  };

  const fetchMedicationResource = () => {
    //atcDrugCode
    const fetchEncounterResourceAPIUrl =
      "https://synthir-test-fhir-server.azurehealthcareapis.com/Medication/" +
      medicationIdentifier;
    fetch(fetchEncounterResourceAPIUrl, {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAtcDrugCode(data.code.coding[0].code);
      });
  };

  const fetchPrediction = () => {
    //gender, birthDate, state, patientResourceID
    fetch(
      "http://localhost:5000/predict?Sex=" +
        gender +
        "&Age_Group=1&County=" +
        postalCode +
        "&Main_Diagnosis=" +
        diagnosisCode +
        "&Arrival_Mode=" +
        status +
        "&Discharge_To=2&ATC_Code=" +
        atcDrugCode +
        "&Prescribtion_Type=" +
        prescriptionType,
      { method: "GET" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setfinalResult(data.prediction);
      });
  };

  useEffect(() => {
    fetchPatientResource();
  }, []);
  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemText primary={"Gender: " + gender} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary={"BirthDate: " + birthDate} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary={"PostalCode: " + postalCode} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary={"PrescriptioinType: " + prescriptionType} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary={"ATC Drug Code: " + atcDrugCode} />
        </ListItem>
        <Button
          style={{ marginLeft: 20 }}
          onClick={fetchEncounterResource}
          variant="contained"
        >
          Get Encounter Data
        </Button>
      </List>
      {encounterData && encounterData.length !== 0 && (
        <TableContainer style={{ maxHeight: 150, maxWidth: 400 }}>
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead style={{ backgroundColor: "pink", color: "white" }}>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Discharge Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {encounterData.map((row) => (
                <TableRow
                  key={row.resource.id}
                  onClick={() => fetchConditionResource(row)}
                >
                  <TableCell>{row.resource.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {conditionData && conditionData.length !== 0 && (
        <TableContainer style={{ maxHeight: 150, maxWidth: 150 }}>
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead style={{ backgroundColor: "pink", color: "white" }}>
              <TableRow>
                <TableCell>Diagnosis Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conditionData.map((row) => (
                <TableRow
                  key={row.resource.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    fetchMedicationRequestResource();
                    setDiagnosisCode(row.resource.code.coding[0].code);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.resource.code.coding[0].code}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        style={{ marginLeft: 20 }}
        onClick={fetchPrediction}
        variant="contained"
      >
        Get Prediction
      </Button>
      <TextField id="filled-basic" label={finalResult} variant="filled" />
    </>
  );
};
