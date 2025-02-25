import React from 'react';
import Button from './Button';

const Filter = ({ 
  data, 
  filters, 
  filterKeys, 
  handleFilterChange, 
  resetFilters,
  filterLabels = {
    group: 'Groupes',
    date: 'Dates',
    heuredebut: 'Heures',
    lieu: 'Lieux',
    type: 'Types'
  }
}) => {
  // Mémoïsation des options uniques
  const uniqueOptions = React.useMemo(() => {
    const options = {};
    filterKeys.forEach((key) => {
      // Gestion spécifique pour certains types de filtres
      let uniqueValues = [...new Set(data.map(item => item[key]))];
      
      // Tri des valeurs si nécessaire
      if (key === 'date') {
        uniqueValues = uniqueValues.sort((a, b) => new Date(a) - new Date(b));
      } else if (typeof uniqueValues[0] === 'string') {
        uniqueValues = uniqueValues.sort();
      }
      
      options[key] = uniqueValues;
    });
    return options;
  }, [data, filterKeys]);

  return (
    <div className="mb-6">
      <form className="flex flex-wrap justify-center space-x-4 items-center bg-concert-bg-beige p-4 rounded-lg shadow-md">
        {filterKeys.map((key) => (
          <div key={key} className="w-full sm:w-auto mb-2 sm:mb-0">
            <select
              id={key}
              name={key}
              value={filters[key] || ''}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              className="mt-1 block w-full p-2 border border-green-300 rounded-md text-black bg-white"
              style={{ minWidth: '150px' }} 
            >
              <option value="">
                {filterLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
              {uniqueOptions[key].map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="mt-1 sm:mt-0">
          <Button 
            onClick={resetFilters} 
            label="Réinitialiser les filtres" 
            type="button" 
          />
        </div>
      </form>
    </div>
  );
};

export default Filter;