import React from 'react';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { useResponsiveDisplay } from '../../hooks/useResponsiveDisplay';
import { useEventFiltering } from '../../hooks/useEventFiltering';
import { formatDate, formatTime } from '../../utils/formatUtilis';

const ConcertsOverview = () => {
  const displayCount = useResponsiveDisplay();
  const { events: concerts, loading, error } = useEventFiltering('/api/concerts');

  if (loading) return <p>Chargement des concerts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const concertCount = displayCount;

  return (
    <section className="container mx-auto py-8">
      <Text 
        content="Planning des Concerts" 
        type="h2" 
        className="text-2xl font-bold mb-6 text-center" 
      />
      
      <div className={`grid grid-cols-1 ${displayCount === 2 ? 'md:grid-cols-2' : ''} ${displayCount === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
        {concerts.slice(0, concertCount).map((concert) => {
          // Construction de l'info additionnelle
          const formattedDate = formatDate(concert.date);
          const formattedStartTime = formatTime(concert.start_time);
          const formattedEndTime = formatTime(concert.end_time);

          const additionalInfo = [
            formattedDate,
            `${formattedStartTime} - ${formattedEndTime}`,
            concert.venue
          ]
          .filter(Boolean) // Retire les éléments vides
          .join(' | ');

          return (
            <InfoCard
              key={concert.id}
              title={concert.name}
              description={concert.description}
              image={concert.image_url}
              additionalInfo={additionalInfo}
              type="concert"
            />
          );
        })}
      </div>
      
      <div className="flex justify-center mt-6">
        <Button
          label="Voir tous les concerts"
          href="/concerts"
        />
      </div>
    </section>
  );
};

export default ConcertsOverview;