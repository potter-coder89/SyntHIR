import './App.css';
// import {MainPage} from "./mainPage/mainPage"
import {Authentication} from "./authentication/Authentication"
import { OnStartDibs } from './onStart/onStartDibs';
import { OnStartSynthir } from './onStart/onStartSynthir';
function App() {
  const issDibs = "https://api.dips.no/fhir"
  const issSynthir = "https://synthir-test-fhir-server.azurehealthcareapis.com"
  const iss = issSynthir
  return (
    <>
    <Authentication iss={iss} />
      </>

  );
}

export default App;
