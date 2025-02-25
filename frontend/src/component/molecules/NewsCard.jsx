import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/Text';

const NewsCard = ({ title, description, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col m-4 border-l-4 border-gray-800 p-4 ${className}`}>
      <div className="flex flex-col justify-between flex-grow">
        <Text type="h3" content={title} className="mb-2 h3-class" />
        <Text type="p" content={description} className="mb-4 p-class" />
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NewsCard;