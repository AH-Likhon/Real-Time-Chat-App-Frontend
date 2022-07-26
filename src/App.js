import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Messenger from './components/Messenger';
import PrivateRoute from './components/PrivateRoute';
import RedirectRegMess from './components/RedirectRegMess';
// import { useSelector } from 'react-redux';
// import RedirectRegMess from './components/redirectRegMess';

function App() {
  // const { authenticate } = useSelector(state => state.auth);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/login" element={<Login />} exact />
          {/* {
            !authenticate ? <Route path="/register" element={<Register />} exact /> : <Route path="/messenger" element={<Messenger />} />
          } */}
          {/* <Route path="/messenger" element={<Messenger />} exact /> */}
          <Route path="/messenger" element={<PrivateRoute>
            <Messenger />
          </PrivateRoute>}>
          </Route>
          <Route path="/register" element={<RedirectRegMess>
            <Register />
          </RedirectRegMess>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
