import "./assets/styles/App.scss";
import Routes from "./router/index.js";
import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
    <div className="main-container">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
