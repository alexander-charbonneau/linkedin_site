// Library imports
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

// Style imports
import './style/App.css';

// Page imports
import Home from "./pages/Home.tsx"
import Contact from "./pages/Contact.tsx"

// Componenet imports
import Nav from "./components/Nav.tsx"

// Media imports
import Bg from "./videos/bg-1.mp4"

function App() {
  return (
  <>
  <video className="video-background" src={Bg} autoPlay loop muted playsInline />
    <Router>
    <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
