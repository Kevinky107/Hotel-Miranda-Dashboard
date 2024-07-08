import Login from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './pages/menu';
import Dashboard from './pages/dashboard';
import Bookings from './pages/booking/bookings';
import Room from './pages/room/room';
import Contact from './pages/contact/contact';
import Concierge from './pages/concierge/concierge';
import NewRoom from './pages/room/newRoom';
import NewEmployee from './pages/concierge/newEmployee';
import EditUser from './pages/editUser';
import { ThemeContext } from './context/theme';
import { AuthContextProvider } from './context/auth';
import EditRoom from './pages/room/editRoom';
import EditBooking from './pages/booking/editBooking';
import EditEmployee from './pages/concierge/editEmployee';

function App() {

  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

  return (

    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <AuthContextProvider>
          <Routes>
              <Route path="/" element={ <Login /> } />
              <Route element={ <Menu /> } >
                <Route path="/EditUserData" element={ <EditUser/> } />
                <Route path="/Dashboard" element={ <Dashboard /> } />
                <Route path="/Bookings" element={ <Bookings /> } />
                <Route path="/EditBooking/:bookingID" element={ <EditBooking /> } />
                <Route path="/Room" element={ <Room /> } />
                <Route path="/NewRoom" element={ <NewRoom /> } />
                <Route path="/EditRoom/:roomID" element={ <EditRoom /> } />
                <Route path="/Contact" element={ <Contact /> } />
                <Route path="/Concierge" element={ <Concierge /> } />
                <Route path="/EditEmployee/:userID" element={ <EditEmployee /> } />
                <Route path="/NewEmployee" element={ <NewEmployee/> } />
              </Route>
          </Routes>
        </AuthContextProvider>
      </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App
