import React from 'react';
import { render, screen } from '@testing-library/react';
import PracticalInfo from '../../component/organisms/PracticalInfo';
import Text from '../../component/atoms/Text';
import Accordion from '../../component/molecules/Accordion';

// On mock le composant Text pour qu'il rende réellement le contenu passé via la prop "content"
jest.mock('../../component/atoms/Text', () =>
  jest.fn(({ content, ...props }) => <h2 {...props}>{content}</h2>)
);

// On mock le composant Accordion pour qu'il affiche son titre et ses enfants
jest.mock('../../component/molecules/Accordion', () =>
  jest.fn(({ title, children }) => (
    <div data-testid="accordion">
      <div>{title}</div>
      <div>{children}</div>
    </div>
  ))
);

// On mock le fichier JSON contenant les données du PracticalInfo
jest.mock(
  '../../data/practicalInfoData.json',
  () => ({
    sections: [
      {
        title: "Accès et Transport",
        content:
          "Adresse : 123 rue du Festival, Paris, France. Moyens de transport : Bus n°3, Tram n°7. Navettes : Départ toutes les 30 minutes depuis la gare centrale. Parking : Disponible à proximité avec des tarifs spéciaux. Horaires d’ouverture : De 10h à 23h tous les jours du festival."
      },
      {
        title: "Hébergement",
        content:
          "Pour votre séjour, voici quelques options d'hébergement à proximité : Hôtel 4 étoiles : Chambre solo, duo, famille à partir de 100 euros . Partenariats et réductions disponibles pour les festivaliers."
      },
      {
        title: "Restauration",
        content:
          "Découvrez nos options de restauration sur place : Stands de nourriture : Variété de plats y compris options végétariennes et vegan. Bars : Large choix de boissons."
      },
      {
        title: "Sécurité et Santé",
        content:
          "Emplacements des postes de secours. Numéros d'urgence : 112 pour les urgences médicales et 17 pour la police. Mesures sanitaires : Respect des mesures COVID-19, port du masque recommandé, désinfection des mains."
      },
      {
        title: "Plan du Site",
        content:
          "Carte interactive du site du festival. Emplacements des scènes, toilettes ..."
      },
      {
        title: "Objets Trouvés",
        content:
          "Procédure pour récupérer les objets perdus : Se rendre au stand des objets trouvés situé à l'entrée principale. Horaires d'ouverture du stand : 10h-23h."
      },
      {
        title: "Horaires et Programme",
        content:
          "Horaires d'ouverture du festival : De 10h à 23h. Programme détaillé des concerts et événements disponible sur le site web du festival."
      },
      {
        title: "FAQ",
        faqItems: [
          {
            question: "Quels sont les horaires d'ouverture ?",
            answer: "Le festival ouvre ses portes à 10h et ferme à 23h."
          },
          {
            question: "Y a-t-il des options de restauration végétariennes ?",
            answer: "Oui, nous avons plusieurs stands offrant des options végétariennes et véganes."
          },
          {
            question: "Comment puis-je accéder au festival ?",
            answer: "Vous pouvez utiliser les transports en commun, des navettes sont disponibles depuis la gare centrale, et un parking est à disposition."
          },
          {
            question: "Où puis-je trouver de l'aide médicale sur place ?",
            answer: "Des postes de secours sont disponibles sur le site. En cas d'urgence, appelez le 112."
          }
        ]
      }
    ]
  }),
  { virtual: true }
);

describe('PracticalInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('affiche le titre et toutes les sections avec leur contenu et FAQ', () => {
    render(<PracticalInfo />);

    // Vérifie que le titre principal est affiché
    expect(screen.getByText("Infos Pratiques et FAQ")).toBeInTheDocument();

    // Vérifie que chaque section est affichée
    expect(screen.getByText("Accès et Transport")).toBeInTheDocument();
    expect(screen.getByText("Hébergement")).toBeInTheDocument();
    expect(screen.getByText("Restauration")).toBeInTheDocument();
    expect(screen.getByText("Sécurité et Santé")).toBeInTheDocument();
    expect(screen.getByText("Plan du Site")).toBeInTheDocument();
    expect(screen.getByText("Objets Trouvés")).toBeInTheDocument();
    expect(screen.getByText("Horaires et Programme")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();

    // Vérifie le contenu de certaines sections
    expect(screen.getByText(/Adresse : 123 rue du Festival/)).toBeInTheDocument();
    expect(screen.getByText(/Pour votre séjour/)).toBeInTheDocument();
    expect(screen.getByText(/Découvrez nos options de restauration/)).toBeInTheDocument();
    expect(screen.getByText(/Emplacements des postes de secours/)).toBeInTheDocument();
    expect(screen.getByText(/Carte interactive du site/)).toBeInTheDocument();
    expect(screen.getByText(/Procédure pour récupérer les objets perdus/)).toBeInTheDocument();
    expect(screen.getByText(/Horaires d'ouverture du festival/)).toBeInTheDocument();

    // Vérifie les éléments de la FAQ
    expect(screen.getByText("Quels sont les horaires d'ouverture ?")).toBeInTheDocument();
    expect(screen.getByText("Le festival ouvre ses portes à 10h et ferme à 23h.")).toBeInTheDocument();
    expect(screen.getByText("Y a-t-il des options de restauration végétariennes ?")).toBeInTheDocument();
    expect(screen.getByText("Oui, nous avons plusieurs stands offrant des options végétariennes et véganes.")).toBeInTheDocument();
    expect(screen.getByText("Comment puis-je accéder au festival ?")).toBeInTheDocument();
    expect(
      screen.getByText("Vous pouvez utiliser les transports en commun, des navettes sont disponibles depuis la gare centrale, et un parking est à disposition.")
    ).toBeInTheDocument();
    expect(screen.getByText("Où puis-je trouver de l'aide médicale sur place ?")).toBeInTheDocument();
    expect(
      screen.getByText("Des postes de secours sont disponibles sur le site. En cas d'urgence, appelez le 112.")
    ).toBeInTheDocument();
  });
});
