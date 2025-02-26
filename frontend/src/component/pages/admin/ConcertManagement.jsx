import React, { useState, useEffect } from 'react';
import axios from '../../../config/axiosConfig';
import AdminSidebar from './components/AdminSidebar';

const ConcertManagement = () => {
  // États
  const [concerts, setConcerts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    date: '',
    start_time: '',
    end_time: '',
    venue: '',
    type: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chargement initial des concerts
  useEffect(() => {
    fetchConcerts();
  }, []);

  // Récupération des concerts
  const fetchConcerts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/concerts');
      setConcerts(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des concerts');
    } finally {
      setLoading(false);
    }
  };

  // Gestion du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/admin/concerts/${editingId}`, formData);
      } else {
        await axios.post('/api/admin/concerts', formData);
      }
      fetchConcerts();
      resetForm();
    } catch (err) {
      setError('Erreur lors de la sauvegarde du concert');
    }
  };

  // Modification d'un concert
  const handleEdit = (concert) => {
    setFormData({
      name: concert.name,
      description: concert.description,
      image_url: concert.image_url,
      date: concert.date.split('T')[0],
      start_time: concert.start_time,
      end_time: concert.end_time,
      venue: concert.venue,
      type: concert.type
    });
    setEditingId(concert.id);
    setIsEditing(true);
    setIsAdding(true);
  };

  // Suppression d'un concert
  const handleDelete = async (concertId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce concert ?')) return;
    
    try {
      await axios.delete(`/api/admin/concerts/${concertId}`);
      fetchConcerts();
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  // Réinitialisation du formulaire
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image_url: '',
      date: '',
      start_time: '',
      end_time: '',
      venue: '',
      type: ''
    });
    setIsAdding(false);
    setIsEditing(false);
    setEditingId(null);
  };

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
        <h1 className="text-3xl font-bold mb-6">Gestion des Concerts</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button onClick={() => setError(null)} className="float-right">&times;</button>
          </div>
        )}

        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
          >
            Ajouter un Concert
          </button>
        )}

        {isAdding && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom du concert"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Lieu"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Type de concert"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              className="w-full border p-2 rounded mt-4"
              rows="4"
            />
            <input
              type="text"
              placeholder="URL de l'image"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              className="w-full border p-2 rounded mt-4"
            />
            <div className="flex justify-between mt-4">
              <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? 'Modifier' : 'Ajouter'}
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

        <div className="bg-white rounded shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Horaires</th>
                <th className="p-3 text-left">Lieu</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {concerts.map((concert) => (
                <tr key={concert.id} className="border-b">
                  <td className="p-3">{concert.name}</td>
                  <td className="p-3">{new Date(concert.date).toLocaleDateString()}</td>
                  <td className="p-3">{concert.start_time} - {concert.end_time}</td>
                  <td className="p-3">{concert.venue}</td>
                  <td className="p-3">{concert.type}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleEdit(concert)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Modifier
                    </button>
                    <button 
                      onClick={() => handleDelete(concert.id)}
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

export default ConcertManagement;