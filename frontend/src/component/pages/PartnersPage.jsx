import React from 'react';
import { useEventFiltering } from '../../hooks/useEventFiltering';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemPerPage';
import PartnersPageTemplate from '../templates/PartnersPageTemplate';
import Text from '../atoms/Text';
import PartnerCard from '../molecules/PartnersCard';
import Button from '../atoms/Button';

const PartnersPage = () => {
  const { 
    events: partners, 
    loading, 
    filters: eventFilters, 
    updateFilter, 
    resetFilters 
  } = useEventFiltering('/api/partners', {
    initialFilters: { 
      category: '' // Utilise "category" pour être cohérent
    },
    uniqueFilterKeys: ['category'],
    transformData: (data) => data.sort((a, b) => a.name.localeCompare(b.name)), // Exemple de tri
  });

  const {
    paginatedItems,
    pagination
  } = useResponsiveItemsPerPage(partners);

  // Création des boutons de filtre par catégorie de partenaire
  const filterButtons = (
    <div className="flex flex-wrap justify-center mb-6 space-x-2 space-y-2 sm:space-x-4 sm:space-y-0">
      {['Tous', ...new Set(partners.map(item => item.category || ''))].map((category, index) => (
        <Button
          key={index}
          label={category}
          onClick={() => updateFilter('category', category === 'Tous' ? '' : category)}
          isSelected={eventFilters.category === (category === 'Tous' ? '' : category)}
        />
      ))}
    </div>
  );

  const partnersSection = (
    <section className="mb-12">
      {loading ? (
        <p>Chargement...</p>
      ) : partners.length === 0 ? (
        <p>Aucun partenaire disponible.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedItems.map((partner) => (
              <PartnerCard
                key={partner.id}
                name={partner.name}
                logo={partner.logo_url}
                link={partner.website_url}
                description={partner.description}
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
                  label={String(i + 1)}
                  onClick={() => pagination.onPageSelect(i + 1)}
                  isSelected={pagination.currentPage === i + 1}
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

  const ctaSection = (
    <div className="mt-12 text-center">
      <Text 
        content="Vous souhaitez devenir partenaire ?" 
        type="h2" 
        className="h2-class mb-4" 
      />
      <Button
        label="Envoyez-nous un email"
        onClick={() => window.location.href = 'mailto:contact@example.com'}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />
    </div>
  );

  const messageSection = (
    <div className="bg-yellow-100 p-4 rounded-lg mb-6 text-center">
      <Text 
        content="Profitez de réductions chez nos partenaires !" 
        type="h2" 
        className="text-xl font-semibold" 
      />
    </div>
  );

  return (
    <PartnersPageTemplate
      partners={partnersSection}
      cta={ctaSection} 
      message={messageSection}
      filters={filterButtons}
    />
  );
};

export default PartnersPage;
