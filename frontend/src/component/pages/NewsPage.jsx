import React from 'react';
import { useEventFiltering } from '../../hooks/useEventFiltering';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemPerPage';
import NewsPageTemplate from '../templates/NewsPageTemplate';
import NewsCard from '../molecules/NewsCard';
import Button from '../atoms/Button';

const NewsPage = () => {
  const { 
    events: news, 
    loading, 
    filters, 
    updateFilter
  } = useEventFiltering('/api/news', {
    initialFilters: { category: '' },  // Initialement vide pour afficher toutes les données
    uniqueFilterKeys: ['category'],
    transformData: (data) => data.sort((a, b) => a.importance - b.importance)
  });

  const {
    paginatedItems,
    pagination
  } = useResponsiveItemsPerPage(news);

  // Création des boutons de filtre par catégorie
  const filterButtons = (
    <div className="flex flex-wrap justify-center mb-6 space-x-2 space-y-2 sm:space-x-4 sm:space-y-0">
      {['Tous', ...new Set(news.map(item => item.category || ''))].map((category, index) => (
        <Button
          key={index}
          label={category}
          onClick={() => updateFilter('category', category === 'Tous' ? '' : category)}  // Vide pour afficher tous les éléments
          isSelected={filters.category === (category === 'Tous' ? '' : category)}
        />
      ))}
    </div>
  );

  return (
    <NewsPageTemplate
      title="Actualités"
      filters={filterButtons} 
      newsItems={loading ? <p>Chargement...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
              title={newsItem.title}
              description={newsItem.description}
            />
          ))}
        </div>
      )}
      pagination={pagination && (
        <div className="flex justify-center mt-6 gap-2">
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
              className="mx-1"
            />
          ))}
          <Button 
            onClick={pagination.onNext}
            disabled={!pagination.hasNext}
            label="Suivant"
          />
        </div>
      )}
    />
  );
};

export default NewsPage;
