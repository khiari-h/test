import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const ProgrammingPageTemplate = ({
  currentSection,
  onSectionChange,
  children,
}) => {
  return (
    <div className="bg-global text-concert-text min-h-screen">
      <Header />
      <main className="container mx-auto py-8">
        <Text content="Programmation du Festival" type="h1" className="text-2xl font-bold mb-6 text-center" />
        <div className="flex justify-center mt-6 space-x-4 mb-6">
          <Button
            label="Concerts"
            onClick={() => onSectionChange('concerts')}
            className={currentSection === 'concerts' ? 'active' : ''}
          />
          <Button
            label="Rencontres avec les Artistes"
            onClick={() => onSectionChange('artistMeetings')}
            className={currentSection === 'artistMeetings' ? 'active' : ''}
          />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
};

ProgrammingPageTemplate.propTypes = {
  currentSection: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProgrammingPageTemplate;
