import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import ProtectedRoute from './components/ProtectedRoute';
import ContactForm from './pages/ContactForm';
import Contacts from './pages/Contacts';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contacts/new"
        element={
          <ProtectedRoute>
            <ContactForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contacts/edit/:id"
        element={
          <ProtectedRoute>
            <ContactForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;