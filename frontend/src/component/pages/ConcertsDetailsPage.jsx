import React from 'react';
import { useEventFiltering } from '../../hooks/useEventFiltering';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemPerPage';
import { formatDate, formatTime } from '../../utils/formatUtilis';
import ConcertsDetailsPageTemplate from '../templates/ConcertsDetailsPageTemplate';
import InfoCard from '../molecules/InfoCard';
import Filter from '../atoms/Filter';
import Button from '../atoms/Button';

const ConcertsDetailsPage = () => {
  const { 
    events: concerts, 
    loading, 
    filters, 
    updateFilter, 
    resetFilters,
    uniqueFilterValues
  } = useEventFiltering('/api/concerts', {
    initialFilters: { 
      name: '', 
      date: '', 
      venue: '', 
      type: '' 
    },
    uniqueFilterKeys: ['name', 'date', 'venue', 'type']
  });

  const {
    paginatedItems,
    pagination
  } = useResponsiveItemsPerPage(concerts);

  const filterLabels = {
    name: 'Nom du concert',
    date: 'Date',
    venue: 'Scène',
    type: 'Type de concert'
  };

  return (
    <ConcertsDetailsPageTemplate
      filters={
        <Filter
          data={concerts}
          filters={filters}
          filterKeys={['name', 'date', 'venue', 'type']}
          handleFilterChange={updateFilter}
          resetFilters={resetFilters}
          filterLabels={filterLabels}
          uniqueFilterValues={uniqueFilterValues}
        />
      }
      concerts={
        <>
          {loading ? (
            <p>Chargement des concerts...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map((concert) => (
                  <InfoCard
                    key={concert.id}
                    title={concert.name}
                    description={concert.description}
                    image={concert.image_url}
                    additionalInfo={`
                      ${formatDate(concert.date)} | 
                      ${formatTime(concert.start_time)} - ${formatTime(concert.end_time)} | 
                      ${concert.venue}
                    `}
                    type="concert"
                  />
                ))}
              </div>
              
              {pagination && (
                <div className="flex justify-center mt-4 gap-2">
                  <Button 
                    onClick={pagination.onPrevious}
                    disabled={!pagination.hasPrevious}
                    label="Précédent"
                  />
                  {Array.from({ length: pagination.totalPages }, (_, i) => (
                    <Button 
                      key={i + 1}
                      onClick={() => pagination.onPageSelect(i + 1)}
                      isSelected={pagination.currentPage === i + 1}
                      label={String(i + 1)}
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
        </>
      }
    />
  );
};

export default ConcertsDetailsPage;