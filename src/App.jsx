import Login from './pages/login/login';
import './App.css'

import { createContext, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './pages/menu/menu';
import Dashboard from './pages/dashboard/dashboard';


export const ThemeContext = createContext(null);

function App() {

  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

  return (

    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <Routes>
            <Route path="/" element={ <Login /> } />
            <Route element={ <Menu /> } >
              <Route path="/Dashboard" element={ <Dashboard /> } />
            </Route>
        </Routes>
      </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App
