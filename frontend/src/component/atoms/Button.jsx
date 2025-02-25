import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick, href, className = '', isSelected = false }) => {
  // Classes de base pour le bouton, avec des ajustements pour la réactivité (responsive)
  const baseClasses = "inline-block font-bold text-center cursor-pointer rounded-full py-2 px-4 sm:py-3 sm:px-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue";
  
  // Classes pour l'état par défaut
  const defaultClasses = "bg-light-blue hover:bg-white hover:text-light-blue text-white font-concert-body";
  
  // Classes pour l'état sélectionné
  const selectedClasses = "bg-light-blue";

  // Combinaison des classes en fonction de l'état sélectionné ou non
  const combinedClasses = isSelected ? `${baseClasses} ${selectedClasses}` : `${baseClasses} ${defaultClasses}`;

  // Déterminer si l'on doit rendre un élément <a> ou <button>
  if (href && href.trim() !== '') {
    return (
      <a
        href={href}
        className={`${combinedClasses} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {label}
      </a>
    );
  }

  // Fournir un gestionnaire onClick par défaut s'il n'est pas fourni
  const handleClick = onClick || (() => console.warn("Button cliqué sans gestionnaire onClick"));

  return (
    <button onClick={handleClick} className={`${combinedClasses} ${className}`} aria-label={label}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,  // Accepter à la fois string et number
  ]).isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  className: PropTypes.string,
  isSelected: PropTypes.bool,
};

export default Button;
