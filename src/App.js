import './App.css';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Messenger from './components/Messenger';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact/>
          <Route path="/login" element={<Login />} exact/>
          <Route path="/register" element={<Register />} exact/>
          <Route path="/messenger" element={<Messenger />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
