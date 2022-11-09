// css imports
import './App.css';
import './css/navbar.scss';
import './css/home.scss';

// elements
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import About from './pages/About';
import Contact from './pages/Contact';
import RoomDetail from './pages/RoomDetail';
import RoomChoices from './pages/RoomChoices';
import Checkout from './pages/Checkout';
import Booked from './pages/Booked';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
      <div>
        <h1 align="center" style={{ fontWeight: "600" }}>The Great Random Hotel</h1>
        <NavBar />
    
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/rooms" element={<Rooms/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            
            <Route path="/admin" element={<Admin/>} />
            <Route path="/admin/dashboard" element={<AdminDashboard/>} />

            <Route path="/room-detail" element={<RoomDetail/>} />
            <Route path="/room-choices" element={<RoomChoices/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/booked" element={<Booked/>} />

          </Routes>

        <Footer />
      </div>
  );
}

export default App;
