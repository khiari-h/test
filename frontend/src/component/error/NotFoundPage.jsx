import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-soft-beige">
      <h1 className="text-6xl font-headline mb-4">404</h1>
      <p className="text-xl mb-4">Page non trouvée</p>
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
