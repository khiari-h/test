import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { 
      label: 'Tableau de bord', 
      path: '/admin/dashboard', 
      icon: '📊' 
    },
    { 
      label: 'Concerts', 
      path: '/admin/concerts', 
      icon: '🎵' 
    },
    { 
      label: 'Rencontres Artistes', 
      path: '/admin/meetings', 
      icon: '🤝' 
    },
    { 
      label: 'Actualités', 
      path: '/admin/news', 
      icon: '📰' 
    },
    { 
      label: 'Déconnexion', 
      path: '/admin/logout', 
      icon: '🚪' 
    }
  ];

  const handleLogout = () => {
    // Logique de déconnexion
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full fixed left-0 top-0 py-6">
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav>
        {menuItems.map((item) => (
          item.path === '/admin/logout' ? (
            <button
              key={item.path}
              onClick={handleLogout}
              className={`w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center ${
                location.pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 hover:bg-gray-700 flex items-center ${
                location.pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          )
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;