import React, { useState } from 'react';
import axios from '../../../../config/axiosConfig';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Première requête pour obtenir le token CSRF
      await axios.get('/sanctum/csrf-cookie');

      // Authentification
      const response = await axios.post('/api/login', {
        email,
        password
      });

      // Stocker le token dans le localStorage
      localStorage.setItem('admin_token', response.data.token);
      
      // Rediriger vers le tableau de bord admin
      window.location.href = '/admin/dashboard';
    } catch (err) {
      setError('Identifiants incorrects');
      console.error('Erreur de connexion', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Espace Admin</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;