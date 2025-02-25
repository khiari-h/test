import React from 'react';
import PropTypes from 'prop-types';

const NavItem = ({ label, href, className = '' }) => {
  return (
    <a
      href={href}
      className={`font-concert-subtitle text-concert-text hover:text-custom-yellow-500 px-3 py-2 rounded-md text-sm font-bold transform transition duration-500 hover:scale-110 ${className}`}
    >
      {label}
    </a>
  );
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NavItem;
