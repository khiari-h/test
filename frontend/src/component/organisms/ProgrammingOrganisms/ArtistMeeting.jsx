import React from 'react';
import { useEventFiltering } from '../../../hooks/useEventFiltering';
import { useResponsiveItemsPerPage } from '../../../hooks/useResponsiveItemPerPage';
import { formatDate, formatTime } from '../../../utils/formatUtilis';
import InfoCard from '../../molecules/InfoCard';
import Text from '../../atoms/Text';
import Filter from '../../atoms/Filter';
import Button from '../../atoms/Button';

const ArtistMeeting = ({ apiEndpoint = '/api/meetings' }) => {
  // Configuration des filtres spécifiques aux rencontres d'artistes
  const { 
    events: meetings, 
    loading, 
    filters, 
    updateFilter, 
    resetFilters,
    uniqueFilterValues 
  } = useEventFiltering(apiEndpoint, {
    initialFilters: { 
      date: '', 
      start_time: '', 
      venue: '', 
      type: '' 
    },
    uniqueFilterKeys: ['date', 'start_time', 'venue', 'type']
  });

  // Pagination des rencontres
  const {
    paginatedItems,
    pagination
  } = useResponsiveItemsPerPage(meetings);

  // Libellés personnalisés pour les filtres
  const filterLabels = {
    date: 'Dates',
    start_time: 'Heures',
    venue: 'Lieux',
    type: 'Types de rencontres'
  };

  return (
    <section className="container mx-auto py-8">
      <Text 
        content="Rencontres avec les Artistes" 
        type="h1" 
        className="text-concert-title text-center mb-6"
      />
      
      {loading ? (
        <p className="text-center">Chargement des rencontres...</p>
      ) : (
        <>
          <Filter
            data={meetings}
            filters={filters}
            filterKeys={['date', 'start_time', 'venue', 'type']}
            handleFilterChange={updateFilter}
            resetFilters={resetFilters}
            filterLabels={filterLabels}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {paginatedItems.map((meeting) => (
              <InfoCard
                key={meeting.id}
                title={meeting.title}
                description={meeting.description}
                image={meeting.artist?.image_url || 'default.jpg'}
                additionalInfo={`
                  Date: ${formatDate(meeting.date)}
                  Heure: ${formatTime(meeting.start_time)} - ${formatTime(meeting.end_time)}
                  Lieu: ${meeting.venue}
                  Type: ${meeting.type}
                  Artiste: ${meeting.artist?.name || 'Non spécifié'}
                `}
                type="meeting"
              />
            ))}
          </div>
          
          {pagination && (
            <div className="flex justify-center mt-8 gap-2">
              <Button 
                onClick={pagination.onPrevious}
                disabled={!pagination.hasPrevious}
                label="Précédent"
              />
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <Button 
                  key={i + 1}
                  onClick={() => pagination.onPageSelect(i + 1)}
                  label={String(i + 1)}
                  className={`mx-1 ${pagination.currentPage === i + 1 ? 'bg-primary' : ''}`}
                />
              ))}
              <Button 
                onClick={pagination.onNext}
                disabled={!pagination.hasNext}
                label="Suivant"
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ArtistMeeting;