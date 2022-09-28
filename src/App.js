// Library imports
import {
  BrowserRouter as Router,
} from "react-router-dom";

// Style imports
import './style/App.css';

// Componenet imports
import MaiRoutes from "./components/MaiRoutes.tsx"
import Nav from "./components/Nav.tsx"

// Media imports
import Bg from "./videos/bg-1.mp4"

function App() {

  return (
  <>
  <video className="video-background" src={Bg} autoPlay loop muted playsInline />
    <Router>
    <Nav />
    <MaiRoutes/>
    </Router>
  </>
  );
}

export default App;
