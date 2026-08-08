import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Events from "./pages/events";
import Profile from "./pages/profile";
import Navbar from "./components/navbar";
import EventDetails from "./pages/eventdetails";
import CreateEvent from "./pages/createEvent";
import ProtectedRoute from "./components/protectedRoute";
import EditEvent from "./pages/editEvent";
import EditProfile from "./pages/editProfile";
import AdminDashboard from "./pages/adminDashboard";
import AdminRoute from "./components/adminRoute";

function App() {
  return (
    <div className="pb-20 md:pb-0">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/events" element={<Events />} />

          <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />

          <Route path="/events/:id" element={<EventDetails />} />

          <Route path="/events/:id/edit" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />

          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminRoute>
                <AdminDashboard />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;