import "./assets/styles/App.scss";
import Routes from "./router/index.js";
import { AuthProvider } from "./components/context/AuthContext";
import { MDBContainer } from "mdbreact";
function App() {
  return (
    <MDBContainer fluid={true} className="p-0 h-100">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </MDBContainer>
  );
}

export default App;
