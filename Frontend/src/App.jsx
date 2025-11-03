// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import GoalsPage from './pages/GoalsPage';
import Dashboard from './pages/Dashboard';

function App() {
  console.log("Appppp");

  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path='/dashboard' element={ <Dashboard/>} />
      </Routes>
    
    
  );
}

export default App;
