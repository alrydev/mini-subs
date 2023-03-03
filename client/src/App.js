import { useContext, useEffect } from 'react';
import { Router, useNavigate, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/userContext';
import { API, setAuthToken } from './config/api';
import './App.css';

import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import TransactionsPage from './pages/TransactionsPage';
import AddCompanyPage from './pages/AddCompanyPage';
import AddVariantPage from './pages/AddVariantPage';

function App() {

  const navigate = useNavigate()

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const [state, dispatch] = useContext(UserContext)

  console.log("state: ", state);

  useEffect(() => {
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.role === 'admin') {
        navigate('/transaction');
      } else if (state.user.role === 'user') {
        navigate('/menu');
      }
    }
  }, [state]);

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/menu" element={<MenuPage />} />
      <Route exact path="/transaction" element={<TransactionsPage />} />
      <Route exact path="/add-company" element={<AddCompanyPage />} />
      <Route exact path="/add-variant" element={<AddVariantPage />} />
    </Routes>
  );
}

export default App;
