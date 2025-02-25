import React, { useState, useEffect } from 'react';
import axios from '../../../config/axiosConfig';
import AdminSidebar from './components/AdminSidebar';

const MeetingManagement = () => {
  const [meetings, setMeetings] = useState([]);
  const [artists, setArtists] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    artist_id: '',
    title: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    venue: '',
    type: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer la liste des rencontres et des artistes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meetingsResponse, artistsResponse] = await Promise.all([
          axios.get('/api/meetings'),
          axios.get('/api/artists')
        ]);
        setMeetings(meetingsResponse.data);
        setArtists(artistsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Ajouter une nouvelle rencontre
  const handleAddMeeting = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/meetings', newMeeting);
      setMeetings([...meetings, response.data]);
      setNewMeeting({
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
    } catch (err) {
      setError('Erreur lors de l\'ajout de la rencontre');
    }
  };

  // Supprimer une rencontre
  const handleDeleteMeeting = async (meetingId) => {
    try {
      await axios.delete(`/api/meetings/${meetingId}`);
      setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
    } catch (err) {
      setError('Erreur lors de la suppression de la rencontre');
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <div className="ml-64 flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Gestion des Rencontres Artistes</h1>

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
            Ajouter une Rencontre
          </button>
        )}

        {/* Formulaire d'ajout */}
        {isAdding && (
          <form onSubmit={handleAddMeeting} className="bg-white p-6 rounded shadow-md mb-6">
            <div className="grid grid-cols-2 gap-4">
              <select
                value={newMeeting.artist_id}
                onChange={(e) => setNewMeeting({...newMeeting, artist_id: e.target.value})}
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
                value={newMeeting.title}
                onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Lieu"
                value={newMeeting.venue}
                onChange={(e) => setNewMeeting({...newMeeting, venue: e.target.value})}
                required
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={newMeeting.date}
                onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                required
                className="border p-2 rounded"
              />
              <input
                type="time"
                value={newMeeting.start_time}
                onChange={(e) => setNewMeeting({...newMeeting, start_time: e.target.value})}
                required
                className="border p-2 rounded"
              />
              <input
                type="time"
                value={newMeeting.end_time}
                onChange={(e) => setNewMeeting({...newMeeting, end_time: e.target.value})}
                required
                className="border p-2 rounded"
              />
              <select
                value={newMeeting.type}
                onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
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
              value={newMeeting.description}
              onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
              required
              className="w-full border p-2 rounded mt-4"
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

        {/* Liste des rencontres */}
        <div className="bg-white rounded shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Titre</th>
                <th className="p-3 text-left">Artiste</th>
                <th className="p-3 text-left">Date</th>
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
                  <td className="p-3">{meeting.date}</td>
                  <td className="p-3">{meeting.venue}</td>
                  <td className="p-3">{meeting.type}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleDeleteMeeting(meeting.id)}
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

export default MeetingManagement;