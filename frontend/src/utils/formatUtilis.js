export const formatDate = (dateStr) => {
    // Si déjà formaté, retourner tel quel
    if (typeof dateStr === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        return dateStr;
    }

    // Cas d'une date vide ou invalide
    if (!dateStr) {
        return '';
    }

    try {
        // Tentative de création d'un objet Date
        const date = new Date(dateStr);
        
        // Vérification de la validité de la date
        if (isNaN(date.getTime())) {
            return '';
        }

        // Formatage standard
        const jour = date.getDate().toString().padStart(2, '0');
        const mois = (date.getMonth() + 1).toString().padStart(2, '0');
        const annee = date.getFullYear();

        return `${jour}/${mois}/${annee}`;
    } catch (error) {
        return '';
    }
};

export const formatTime = (timeStr) => {
    if (!timeStr) return '';

    try {
        // Si déjà au bon format HH:MM, retourner tel quel
        if (/^\d{2}:\d{2}$/.test(timeStr)) {
            return timeStr;
        }

        // Supporte le format HH:MM:SS
        const [hour, minute] = timeStr.split(':');
        
        // Retourner HH:MM
        return `${hour}:${minute}`;
    } catch (error) {
        return '';
    }
};