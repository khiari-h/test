import React from 'react';
import PropTypes from 'prop-types';
import Image from '../atoms/Image';

// Noimage si l'image n'existe pas sur WordPress
const placeholderImage = '/Noimage.jpg';

const InfoCard = ({ title, description, image, additionalInfo, type }) => {
  return (
    <div className={`bg-white border ${type === 'schedule' ? 'border-custom-blue-500' : 'border-gray-800'} rounded-lg shadow-lg overflow-hidden`}>
      <Image 
        src={image || placeholderImage} 
        alt={title} 
        className="w-full h-48 object-cover" 
        srcSet={`
          ${image ? `${image}?w=400 400w, ${image}?w=800 800w, ${image}?w=1200 1200w` : ''}
        `}
        sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
        loading="lazy"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="font-concert-title text-black text-xl font-bold mb-2">{title}</h3>
        <p className="font-concert-description text-black text-base mb-4">{description}</p>
        {additionalInfo && (
          <p className="font-concert-description text-black text-sm mb-2">{additionalInfo}</p>
        )}
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  additionalInfo: PropTypes.string,
  type: PropTypes.string,
};

export default InfoCard;
