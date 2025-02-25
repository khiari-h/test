import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/Text';

const placeholderImage = '/Noimage.jpg';

const PartnerCard = ({ name, logo, link, description, className = '' }) => {
  return (
    <div className={`partner-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6 text-center ${className}`}>
      <div className="flex justify-center mb-4">
        <img
          src={logo || placeholderImage}
          alt={name}
          className="w-32 h-32 object-contain"
          loading="lazy"
        />
      </div>
      <Text type="h3" content={name} className="text-xl font-semibold h3-class" />
      <Text type="p" content={description} className="mt-2 p-class" />
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-pure-blue hover:text-pure-blue mt-2 block"
      >
        Visiter le site
      </a>
    </div>
  );
};

PartnerCard.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default PartnerCard;