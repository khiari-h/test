import React from 'react';
import HomePageTemplate from '../templates/HomePageTemplate';
import HeroSection from '../organisms/HeroSection';
import NewsAndUpdates from '../organisms/NewsAndUpdates';
import ConcertsOverview from '../organisms/ConcertsOverview';
import ProgrammingOverview from '../organisms/ProgrammingOverview';
import CTASection from '../molecules/CTASection';
import PracticalInfo from '../organisms/PracticalInfo';
import Map from '../organisms/Map';



const HomePage = () => {
  const ctaAfterMap = (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 py-8 px-4">
      <CTASection
        title="Découvrez nos partenaires"
        ctas={[
          {
            label: "Nos Partenaires",
            href: "/partenaires",
          },
        ]}
      />
    </div>
  );

  return (
    <HomePageTemplate
      heroSection={<HeroSection />}
      newsAndUpdates={<NewsAndUpdates />}
      concertsOverview={<ConcertsOverview />}
      programmingOverview={<ProgrammingOverview/>}
      ctaBeforeMap={
        <CTASection
          title="Réservez vos billets pour une expérience inoubliable!"
          customClass="ticket-cta-section"
          ctas={[
            {
              label: "Acheter des billets",
              href: "https://www.site-de-billetterie.com",
            },
          ]}
        />
      }
      practicalInfo={<PracticalInfo />}
      map={<Map />}
      ctaAfterMap={ctaAfterMap}
    />
  );
};

export default HomePage;
