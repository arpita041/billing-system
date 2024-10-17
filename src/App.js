import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import LoginPage from './Components/LoginPage/LoginPage';
import PasswordResetPage from './Components/PasswordResetPage/PasswordResetPage';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/passwordReset' element={<PasswordResetPage/>}/>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
