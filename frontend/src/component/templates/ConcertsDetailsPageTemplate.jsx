import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Text from '../atoms/Text';

const ConcertsDetailsPageTemplate = ({ filters, concerts }) => {
  return (
    <div className="bg-global text-concert-text min-h-screen">
      <Header />
      <main className="container mx-auto py-8">
        <Text content="Tous les Concerts et leur Planning" type="h1" className="h1-class text-center mb-6" />
        {filters}
        {concerts}
      </main>
      <Footer />
    </div>
  );
};

ConcertsDetailsPageTemplate.propTypes = {
  filters: PropTypes.node.isRequired,
  concerts: PropTypes.node.isRequired,
};

export default ConcertsDetailsPageTemplate;
