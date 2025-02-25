import React from 'react';
import { useEventFiltering } from '../../../hooks/useEventFiltering';
import { useResponsiveItemsPerPage } from '../../../hooks/useResponsiveItemPerPage';
import { formatDate, formatTime } from '../../../utils/formatUtilis';
import InfoCard from '../../molecules/InfoCard';
import Text from '../../atoms/Text';
import Filter from '../../atoms/Filter';
import Button from '../../atoms/Button';

const ConcertsProgramming = ({ apiEndpoint = '/api/concerts' }) => {
  // Configuration des filtres spécifiques aux concerts
  const { 
    events: concerts, 
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

  // Pagination des concerts
  const {
    paginatedItems,
    pagination
  } = useResponsiveItemsPerPage(concerts);

  // Libellés personnalisés pour les filtres
  const filterLabels = {
    date: 'Dates',
    start_time: 'Heures',
    venue: 'Scènes',
    type: 'Types de concerts'
  };

  return (
    <section className="container mx-auto py-8">
      <Text 
        content="Programmation des Concerts" 
        type="h1" 
        className="text-concert-title text-center mb-6"
      />
      
      {loading ? (
        <p className="text-center">Chargement des concerts...</p>
      ) : (
        <>
          <Filter
            data={concerts}
            filters={filters}
            filterKeys={['date', 'start_time', 'venue', 'type']}
            handleFilterChange={updateFilter}
            resetFilters={resetFilters}
            filterLabels={filterLabels}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {paginatedItems.map((concert) => (
              <InfoCard
                key={concert.id}
                title={concert.name}
                description={concert.description}
                image={concert.image_url}
                additionalInfo={`
                  Date: ${formatDate(concert.date)}
                  Heure: ${formatTime(concert.start_time)} - ${formatTime(concert.end_time)}
                  Lieu: ${concert.venue}
                  Type: ${concert.type}
                `}
                type="program"
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

export default ConcertsProgramming;