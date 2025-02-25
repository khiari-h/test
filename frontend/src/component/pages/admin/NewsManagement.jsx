import React, { useState, useEffect } from 'react';
import axios from '../../../config/axiosConfig';
import AdminSidebar from './components/AdminSidebar';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState({
    title: '',
    description: '',
    category: '',
    importance: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer la liste des actualités
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des actualités');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Ajouter une nouvelle actualité
  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/news', newNews);
      setNews([...news, response.data]);
      setNewNews({
        title: '',
        description: '',
        category: '',
        importance: ''
      });
      setIsAdding(false);
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'actualité');
    }
  };

  // Supprimer une actualité
  const handleDeleteNews = async (newsId) => {
    try {
      await axios.delete(`/api/news/${newsId}`);
      setNews(news.filter(item => item.id !== newsId));
    } catch (err) {
      setError('Erreur lors de la suppression de l\'actualité');
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <div className="ml-64 flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Gestion des Actualités</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Bouton Ajouter */}
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Ajouter une Actualité
          </button>
        )}

        {/* Formulaire d'ajout */}
        {isAdding && (
          <form onSubmit={handleAddNews} className="bg-white p-6 rounded shadow-md mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Titre de l'actualité"
                value={newNews.title}
                onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                required
                className="border p-2 rounded col-span-2"
              />
              <select
                value={newNews.category}
                onChange={(e) => setNewNews({...newNews, category: e.target.value})}
                required
                className="border p-2 rounded"
              >
                <option value="">Catégorie</option>
                <option value="Festival">Festival</option>
                <option value="Artiste">Artiste</option>
                <option value="Concert">Concert</option>
                <option value="Événement">Événement</option>
              </select>
              <select
                value={newNews.importance}
                onChange={(e) => setNewNews({...newNews, importance: e.target.value})}
                required
                className="border p-2 rounded"
              >
                <option value="">Importance</option>
                <option value="Faible">Faible</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Haute">Haute</option>
              </select>
            </div>
            <textarea
              placeholder="Description de l'actualité"
              value={newNews.description}
              onChange={(e) => setNewNews({...newNews, description: e.target.value})}
              required
              className="w-full border p-2 rounded mt-4"
              rows="4"
            />
            <div className="flex justify-between mt-4">
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Enregistrer
              </button>
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {/* Liste des actualités */}
        <div className="bg-white rounded shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Titre</th>
                <th className="p-3 text-left">Catégorie</th>
                <th className="p-3 text-left">Importance</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.importance}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleDeleteNews(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsManagement;