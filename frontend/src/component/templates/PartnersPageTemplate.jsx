import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Text from '../atoms/Text';

const PartnersPageTemplate = ({ filters, partners, cta, message }) => {
  return (
    <div className="bg-global text-concert-text min-h-screen">
      <Header />
      <main className="container mx-auto py-8">
        <Text content="Nos Partenaires" type="h1" className="h1-class text-center mb-6" />
        {filters}
        {message}
        {partners}
        {cta}
      </main>
      <Footer />
    </div>
  );
};

PartnersPageTemplate.propTypes = {
  filters: PropTypes.node.isRequired,
  partners: PropTypes.node.isRequired,
  cta: PropTypes.node.isRequired,
  message: PropTypes.node,
};

export default PartnersPageTemplate;
