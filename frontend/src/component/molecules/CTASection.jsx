import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

// Composant pour afficher une section d'appel à l'action (CTA)

const CTASection = ({ title, ctas, customClass = '' }) => {
  return (
    <section className={`text-center py-8 bg-concert-bg-beige rounded-lg shadow-none ${customClass}`}>
      <Text type="h1" content={title} className="mb-4" />
      <div className="flex justify-center space-x-4">
        {ctas.map((cta, index) => (
          <Button
            key={index}
            label={cta.label}
            href={cta.href}
            className={cta.className}
          />
        ))}
      </div>
    </section>
  );
};

CTASection.propTypes = {
  title: PropTypes.string.isRequired,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ).isRequired,
  customClass: PropTypes.string,
};

export default CTASection;
