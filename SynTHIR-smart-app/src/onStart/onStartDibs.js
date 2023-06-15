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
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const OnStartDibs = (props) => {
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [patientResourceID, setPatientResourceID] = useState("");
  const [status, setStatus] = useState(false);
  const [diagnosisCode, setDiagnosisCode] = useState(false);
  const [atcDrugCode, setAtcDrugCode] = useState(false);
  const [atcDrugCodeList, setAtcDrugCodeList] = useState(false);
  const [encounterData, setEncounterData] = useState([]);
  const [conditionData, setConditionData] = useState([]);
  const [prescriptionType, setPrescriptionType] = useState("");
  const [finalResult, setfinalResult] = useState("");

  const dipsSubscriptionKey = "";
  const accessToken = props.accessToken;
  const patientId = "cdp2010051";
  const handlePrescriptionType = (event) => {
    setPrescriptionType(event.target.value);
  };
  const handleATCDrugCode = (event) => {
    setAtcDrugCode(event.target.value);
  };
  const fetchPatientResource = () => {
    //gender, birthDate, state, patientResourceID
    fetch("https://api.dips.no/fhir/patient/" + patientId, {
      method: "GET",
      headers: { "dips-subscription-key": dipsSubscriptionKey },
    })
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
      "https://api.dips.no/FHIR/Encounter?patient=" + patientResourceID;
    fetch(fetchEncounterResourceAPIUrl, {
      method: "GET",
      headers: { "dips-subscription-key": dipsSubscriptionKey },
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
      " https://api.dips.no/FHIR/Condition?patient=" +
      patientId +
      "&encounter=" +
      encounterDataRow.resource.id;
    fetch(fetchEncounterResourceAPIUrl, {
      method: "GET",
      headers: { "dips-subscription-key": dipsSubscriptionKey },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setConditionData(data.entry);
        setStatus(encounterDataRow.resource.status);
      });
  };

  const fetchMedicationResource = () => {
    //atcDrugCode
    const fetchEncounterResourceAPIUrl =
      "https://synthir-server.azurehealthcareapis.com/Medication";
    fetch(fetchEncounterResourceAPIUrl, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAtcDrugCodeList(data.entry);
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
          <ListItemText primary={gender} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary={birthDate} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary={postalCode} />
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Discharge Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {encounterData.map((row) => (
                <TableRow
                  key={row.index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => fetchConditionResource(row)}
                >
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {conditionData && conditionData.length !== 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Diagnosis Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conditionData.map((row) => (
                <TableRow
                  key={row.index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    setDiagnosisCode(row.code.coding[0].code);
                    fetchMedicationResource();
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.code.coding[0].code}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={prescriptionType}
            label="PrescriptionType"
            onChange={handlePrescriptionType}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={atcDrugCode}
            label="ATC Drug Code"
            onChange={handleATCDrugCode}
          >
            {atcDrugCodeList.map((row) => (
              <MenuItem value={row.code.coding[0].code}>
                {row.code.coding[0].code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

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
