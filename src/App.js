import './App.css';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Hello from './components/Hello';
import Messenger from './components/Messenger';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="/messenger" element={<Messenger />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
