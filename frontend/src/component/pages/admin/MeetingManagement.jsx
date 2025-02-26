import React, { useState, useEffect } from 'react';
import axios from '../../../config/axiosConfig';
import AdminSidebar from './components/AdminSidebar';

const MeetingManagement = () => {
  // États
  const [meetings, setMeetings] = useState([]);
  const [artists, setArtists] = useState([]);
  const [formData, setFormData] = useState({
    artist_id: '',
    title: '',
    description: '',
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

  // Chargement initial des rencontres et des artistes
  useEffect(() => {
    fetchData();
  }, []);

  // Récupération des rencontres et des artistes
  const fetchData = async () => {
    try {
      setLoading(true);
      const [meetingsResponse, artistsResponse] = await Promise.all([
        axios.get('/api/meetings'),
        axios.get('/api/artists')
      ]);
      setMeetings(meetingsResponse.data);
      setArtists(artistsResponse.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  // Gestion du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/admin/meetings/${editingId}`, formData);
      } else {
        await axios.post('/api/admin/meetings', formData);
      }
      fetchData();
      resetForm();
    } catch (err) {
      setError('Erreur lors de la sauvegarde de la rencontre');
    }
  };

  // Modification d'une rencontre
  const handleEdit = (meeting) => {
    setFormData({
      artist_id: meeting.artist_id,
      title: meeting.title,
      description: meeting.description,
      date: meeting.date.split('T')[0],
      start_time: meeting.start_time,
      end_time: meeting.end_time,
      venue: meeting.venue,
      type: meeting.type
    });
    setEditingId(meeting.id);
    setIsEditing(true);
    setIsAdding(true);
  };

  // Suppression d'une rencontre
  const handleDelete = async (meetingId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette rencontre ?')) return;
    
    try {
      await axios.delete(`/api/admin/meetings/${meetingId}`);
      fetchData();
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  // Réinitialisation du formulaire
  const resetForm = () => {
    setFormData({
      artist_id: '',
      title: '',
      description: '',
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
        <h1 className="text-3xl font-bold mb-6">Gestion des Rencontres Artistes</h1>

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
            Ajouter une Rencontre
          </button>
        )}

        {isAdding && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.artist_id}
                onChange={(e) => setFormData({...formData, artist_id: e.target.value})}
                required
                className="border p-2 rounded"
              >
                <option value="">Sélectionner un artiste</option>
                {artists.map(artist => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Titre de la rencontre"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Lieu"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                required
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
                className="border p-2 rounded"
              />
              <input
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                required
                className="border p-2 rounded"
              />
              <input
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                required
                className="border p-2 rounded"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
                className="border p-2 rounded"
              >
                <option value="">Type de rencontre</option>
                <option value="Meet & Greet">Meet & Greet</option>
                <option value="Workshop">Workshop</option>
                <option value="Masterclass">Masterclass</option>
                <option value="Backstage Tour">Backstage Tour</option>
              </select>
            </div>
            <textarea
              placeholder="Description"
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

        <div className="bg-white rounded shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Titre</th>
                <th className="p-3 text-left">Artiste</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Horaires</th>
                <th className="p-3 text-left">Lieu</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr key={meeting.id} className="border-b">
                  <td className="p-3">{meeting.title}</td>
                  <td className="p-3">{meeting.artist?.name || 'Non spécifié'}</td>
                  <td className="p-3">{new Date(meeting.date).toLocaleDateString()}</td>
                  <td className="p-3">{meeting.start_time} - {meeting.end_time}</td>
                  <td className="p-3">{meeting.venue}</td>
                  <td className="p-3">{meeting.type}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleEdit(meeting)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Modifier
                    </button>
                    <button 
                      onClick={() => handleDelete(meeting.id)}
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

export default MeetingManagement;