import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from '../config/axiosConfig';
import { formatDate, formatTime } from '../utils/formatUtilis';

export const useEventFiltering = (apiEndpoint, initialConfig = {}) => {
  // Mappage des clés françaises aux clés originales
  const filterMapping = {
    'nom': 'name',
    'date': 'date',
    'lieu': 'venue',
    'type': 'type'
  };

  // Configuration par défaut
  const defaultConfig = useMemo(() => ({
    initialFilters: {},
    transformData: (data) => 
      data.map(item => ({
        ...item,
        // Transformation des données à la source
        date: formatDate(item.date),
        start_time: formatTime(item.start_time),
        end_time: formatTime(item.end_time)
      })),
    filterStrategy: (event, filters) => 
      Object.entries(filters).every(([frKey, value]) => {
        const key = filterMapping[frKey] || frKey;
        if (!value) return true;
        
        // Gestion des comparaisons avec les valeurs transformées
        if (key === 'date' || key === 'start_time') {
          return event[key] === value;
        }
        
        if (key === 'name' || key === 'venue' || key === 'description') {
          return event[key].toLowerCase().includes(value.toLowerCase());
        }
        
        return event[key] === value;
      }),
    uniqueFilterKeys: []
  }), []);

  // Fusion mémoïsée de la configuration
  const config = useMemo(() => {
    // Convertir les clés françaises en clés originales pour la configuration interne
    const mappedInitialFilters = Object.keys(initialConfig.initialFilters || {}).reduce((acc, frKey) => {
      const originalKey = filterMapping[frKey] || frKey;
      acc[originalKey] = initialConfig.initialFilters[frKey];
      return acc;
    }, {});

    return {
      ...defaultConfig,
      ...initialConfig,
      initialFilters: mappedInitialFilters,
      uniqueFilterKeys: (initialConfig.uniqueFilterKeys || []).map(frKey => filterMapping[frKey] || frKey)
    };
  }, [defaultConfig, initialConfig]);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(config.initialFilters);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get(apiEndpoint);
      const transformedData = config.transformData(response.data);
      setEvents(transformedData);
      setError(null);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, config]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Génération des valeurs uniques de filtres
  const uniqueFilterValues = useMemo(() => {
    const uniqueValues = {};
    // Utiliser les clés françaises pour la sortie
    const reverseMapping = Object.fromEntries(
      Object.entries(filterMapping).map(([fr, en]) => [en, fr])
    );

    config.uniqueFilterKeys.forEach(enKey => {
      const frKey = reverseMapping[enKey] || enKey;
      
      // Pour name et venue, extraire les valeurs uniques avec comparaison de chaîne
      let values = enKey === 'name' || enKey === 'venue'
        ? [...new Set(events.map(event => event[enKey]).filter(Boolean))]
        : [...new Set(events.map(event => event[enKey] || '').filter(Boolean))];
      
      if (enKey === 'date' || enKey === 'start_time') {
        values = values.sort();
      } else {
        values = values.sort((a, b) => a.localeCompare(b));
      }
      
      uniqueValues[frKey] = ['', ...values];
    });
    return uniqueValues;
  }, [events, config]);

  const filteredEvents = useMemo(() => 
    events.filter(event => config.filterStrategy(event, filters)),
    [events, filters, config]
  );

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(config.initialFilters);
  }, [config]);

  return {
    events: filteredEvents,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    uniqueFilterValues,
    refetch: fetchEvents
  };
};