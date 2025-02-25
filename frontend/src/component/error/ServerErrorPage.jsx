import React from 'react';
import { Link } from 'react-router-dom';

const ServerErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-soft-beige">
      <h1 className="text-6xl font-headline mb-4">500</h1>
      <p className="text-xl mb-4">Erreur serveur interne</p>
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default ServerErrorPage;
