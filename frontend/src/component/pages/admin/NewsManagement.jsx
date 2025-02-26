import React, { useState, useEffect } from 'react';
import axios from '../../../config/axiosConfig';
import AdminSidebar from './components/AdminSidebar';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    importance: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer la liste des actualités
  useEffect(() => {
    fetchNews();
  }, []);

  // Fonction pour récupérer les actualités
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/news');
      setNews(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des actualités');
    } finally {
      setLoading(false);
    }
  };

  // Gestion du formulaire (ajout et modification)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation côté client
    if (!formData.title || !formData.description || !formData.category || !formData.importance) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`/api/admin/news/${editingId}`, formData);
      } else {
        await axios.post('/api/admin/news', formData);
      }
      
      fetchNews();
      resetForm();
    } catch (err) {
      setError('Erreur lors de la sauvegarde de l\'actualité : ' + 
        (err.response?.data?.errors ? 
          Object.values(err.response.data.errors).flat().join(', ') : 
          'Erreur inconnue')
      );
    }
  };

  // Modification d'une actualité
  const handleEdit = (newsItem) => {
    setFormData({
      title: newsItem.title,
      description: newsItem.description,
      category: newsItem.category,
      importance: newsItem.importance
    });
    setEditingId(newsItem.id);
    setIsEditing(true);
    setIsAdding(true);
  };

  // Suppression d'une actualité
  const handleDelete = async (newsId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) return;

    try {
      await axios.delete(`/api/admin/news/${newsId}`);
      fetchNews();
      setError(null);
    } catch (err) {
      setError('Erreur lors de la suppression de l\'actualité');
    }
  };

  // Réinitialisation du formulaire
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      importance: ''
    });
    setIsAdding(false);
    setIsEditing(false);
    setEditingId(null);
  };

  // Gestion du chargement
  if (loading && !isAdding && !isEditing) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="ml-64 flex-1 p-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <div className="ml-64 flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Gestion des Actualités</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button 
              onClick={() => setError(null)} 
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Bouton Ajouter */}
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
          >
            Ajouter une Actualité
          </button>
        )}

        {/* Formulaire d'ajout/modification */}
        {isAdding && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Titre de l'actualité"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="border p-2 rounded col-span-2"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                value={formData.importance}
                onChange={(e) => setFormData({...formData, importance: e.target.value})}
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
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              className="w-full border p-2 rounded mt-4"
              rows="4"
            />
            <div className="flex justify-between mt-4">
              <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? 'Modifier' : 'Enregistrer'}
              </button>
              <button 
                type="button"
                onClick={resetForm}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Modifier
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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