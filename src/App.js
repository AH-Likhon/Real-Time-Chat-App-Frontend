import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Messenger from './components/Messenger';
import PrivateRoute from './components/PrivateRoute';
import RedirectRegMess from './components/RedirectRegMess';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/messenger" element={<PrivateRoute>
            <Messenger />
          </PrivateRoute>}>
          </Route>
          <Route path="/register" element={<RedirectRegMess>
            <Register />
          </RedirectRegMess>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
