import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Text from '../atoms/Text';

const NewsPageTemplate = ({ title, filters, newsItems, pagination }) => {
  return (
    <div className="bg-global text-concert-text min-h-screen">
      <Header />
      <main className="container mx-auto py-8">
        <Text content={title} type="h1" className="h1-class text-center mb-8" />
        {filters}
        {newsItems}
        {pagination}
      </main>
      <Footer />
    </div>
  );
};

NewsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  filters: PropTypes.node.isRequired,
  newsItems: PropTypes.node.isRequired,
  pagination: PropTypes.node.isRequired,
};

export default NewsPageTemplate;
