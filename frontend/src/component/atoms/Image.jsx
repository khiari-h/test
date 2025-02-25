import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt, className = '' }) => {
  return <img src={src} alt={alt} className={`object-contain ${className}`} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Image;
