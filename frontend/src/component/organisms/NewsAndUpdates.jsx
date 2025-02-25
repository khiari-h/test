import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import Button from '../atoms/Button';
import NewsCard from '../molecules/NewsCard';
import { useResponsiveDisplay } from '../../hooks/useResponsiveDisplay';
import Text from '../atoms/Text'; 

const NewsAndUpdates = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const displayCount = useResponsiveDisplay(3);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des actualités!", error);
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="news-updates-heading">
      <Text content="Actualités" type="h2" className="mb-8 text-center" id="news-updates-heading" /> 
      {loading && <Text content="Chargement..." type="p" />}
      {error && <Text content={error} type="p" className="text-error-red" />}
      {!loading && !error && (
        <>
          <div className={`grid grid-cols-1 ${displayCount === 2 ? 'md:grid-cols-2' : ''} ${displayCount === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
            {news.slice(0, displayCount).map((newsItem, index) => (
              <NewsCard
                key={index}
                title={newsItem.title}
                description={newsItem.description}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/news" label="Voir toutes les actualités" />
          </div>
        </>
      )}
    </section>
  );
};

export default NewsAndUpdates;
