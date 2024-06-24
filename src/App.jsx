import Login from './pages/login/login';
import './App.css'

import { createContext, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';


export const ThemeContext = createContext(null);
export const AuthContext = createContext(null);

function App() {

  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
  let user = ""

  const setAuth = (u) => {
    user = u;
  }

  return (

    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <AuthContext.Provider value={[user, setAuth]}>
          <Routes>
              <Route path="/" element={ <Login /> } />
              <Route path="/home" element={ <Dashboard /> } />
          </Routes>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App
