import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import axios from './config/axiosConfig';

// Pages publiques existantes
import HomePage from './component/pages/HomePage';
import PartnersPage from './component/pages/PartnersPage';
import ConcertsDetailsPage from './component/pages/ConcertsDetailsPage';
import NewsPage from './component/pages/NewsPage';
import ProgrammingPage from './component/pages/ProgrammingPage';
import NotFoundPage from './component/error/NotFoundPage';
import ServerErrorPage from './component/error/ServerErrorPage';
import LegalInformationPage from './component/pages/Legal/LegalInformationsPage';

// Pages admin
import AdminLogin from './component/pages/admin/auth/AdminLogin';
import AdminDashboard from './component/pages/admin/AdminDashboard';
import ConcertManagement from './component/pages/admin/ConcertManagement';
import MeetingManagement from './component/pages/admin/MeetingManagement';
import NewsManagement from './component/pages/admin/NewsManagement';

import './index.css';

library.add(fab);

// Composant de route privée avec vérification du token
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Vérification du token côté serveur
        await axios.get('/api/admin/verify-token', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('admin_token');
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Chargement...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

const App = () => {
  return (
    <div className="bg-global min-h-screen">
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/legal" element={<LegalInformationPage />} />
          <Route path="/partenaires" element={<PartnersPage />} />
          <Route path="/concerts" element={<ConcertsDetailsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/programmation" element={<ProgrammingPage/>} />
          <Route path="/500" element={<ServerErrorPage />} />

          {/* Routes admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Routes admin protégées */}
          <Route 
            path="/admin/dashboard" 
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/concerts" 
            element={
              <PrivateRoute>
                <ConcertManagement />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/meetings" 
            element={
              <PrivateRoute>
                <MeetingManagement />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/news" 
            element={
              <PrivateRoute>
                <NewsManagement />
              </PrivateRoute>
            } 
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;