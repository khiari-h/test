import React from 'react';
import AdminSidebar from './components/AdminSidebar';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <div className="ml-64 flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Tableau de Bord Admin</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl mb-6">Bienvenue sur le tableau de bord d'administration</h2>
          
          <p className="mb-8 text-gray-600">
            Utilisez la sidebar pour mettre à jour les evenements du concert
          </p>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;