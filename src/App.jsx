import Login from './pages/login';
import { createContext, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './pages/menu';
import Dashboard from './pages/dashboard';
import Bookings from './pages/bookings';
import Room from './pages/room';
import Contact from './pages/contact';
import Concierge from './pages/concierge';
import NewRoom from './pages/newRoom';
import NewEmployee from './pages/newEmployee';
import EditUser from './pages/editUser';


export const ThemeContext = createContext(null);

function App() {

  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

  return (

    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <Routes>
            <Route path="/" element={ <Login /> } />
            <Route element={ <Menu /> } >
              <Route path="/EditUserData" element={ <EditUser/> } />
              <Route path="/Dashboard" element={ <Dashboard /> } />
              <Route path="/Bookings" element={ <Bookings /> } />
              <Route path="/Room" element={ <Room /> } />
              <Route path="/NewRoom" element={ <NewRoom /> } />
              <Route path="/Contact" element={ <Contact /> } />
              <Route path="/Concierge" element={ <Concierge /> } />
              <Route path="/NewEmployee" element={ <NewEmployee/> } />
            </Route>
        </Routes>
      </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App
