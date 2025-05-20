import './index.css';
import {  Route, Routes } from "react-router-dom"
import MainPage from './pages/MainPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import FarmerPage from './pages/FarmerPage.js';
import ManagerPage from './pages/ManagerPage.js';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/farmer' element={<FarmerPage/>}/>
      <Route path='/manager' element={<ManagerPage/>}/>
    </Routes>
  );
}

export default App;
