import React from 'react';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { useResponsiveDisplay } from '../../hooks/useResponsiveDisplay';
import { useEventFiltering } from '../../hooks/useEventFiltering';
import { formatDate, formatTime } from '../../utils/formatUtilis';

const ProgrammingOverview = () => {
  const displayCount = useResponsiveDisplay();

  const { 
    events: meetings, 
    loading,
    error 
  } = useEventFiltering('/api/meetings');

  if (loading) return <p>Chargement de la programmation...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Utiliser directement displayCount
  const meetingCount = displayCount;

  return (
    <section className="container mx-auto py-8">
      <Text 
        content="Programmation" 
        type="h2" 
        className="text-2xl font-bold mb-6 text-center"
      />
      
      <div className={`grid grid-cols-1 ${displayCount === 2 ? 'md:grid-cols-2' : ''} ${displayCount === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
        {meetings.slice(0, meetingCount).map((meeting) => (
          <InfoCard
            key={meeting.id}
            title={meeting.title}
            description={meeting.description}
            image={meeting.artist?.image_url}
            additionalInfo={`${formatDate(meeting.date)} | ${formatTime(meeting.start_time)} - ${formatTime(meeting.end_time)} | ${meeting.venue}`}
            type="meeting"
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          label="Voir la Programmation Complète"
          href="/programmation"
        />
      </div>
    </section>
  );
};

export default ProgrammingOverview;