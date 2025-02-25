import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ content, type, className = '' }) => {
  const baseClasses = {
    h1: 'font-concert-title text-black text-2xl font-bold',
    h2: 'font-concert-subtitle text-black text-xl font-bold',
    h3: 'font-concert-subtitle text-black text-lg font-bold',
    p: 'font-concert-description text-black',
    a: 'text-royal-blue hover:text-black',
  };

  const Tag = type;
  const appliedClasses = `${baseClasses[type] || ''} ${className}`;

  return <Tag className={appliedClasses}>{content}</Tag>;
};

Text.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Text;
