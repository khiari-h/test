import axios from "../config/axiosConfig";

export const fetchWithCache = async (key, url, cacheDuration = 3600) => {
    try {
        const cachedData = localStorage.getItem(key);
        const cachedTime = localStorage.getItem(`${key}_time`);
      
        if (cachedData && cachedTime) {
            const age = (Date.now() - cachedTime) / 1000;
            if (age < cacheDuration) {
                return JSON.parse(cachedData);
            }
        }
      
        const response = await axios.get(url);
        const data = response.data;
      
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(`${key}_time`, Date.now());
      
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Retourne null ou une valeur par défaut en cas d'erreur
    }
};
