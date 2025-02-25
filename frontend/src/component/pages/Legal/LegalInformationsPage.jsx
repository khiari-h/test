import React from 'react';
import Accordion from '../../molecules/Accordion';

const LegalInformationPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Informations Légales</h1>
      
      <Accordion title="Mentions Légales">
        <p>Nation Sounds est édité par Music Festival SARL, société à responsabilité limitée au capital de 100,000€, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789, dont le siège social est situé au 123 rue de la Musique, 75000 Paris, France.</p>
        <p>Email : contact@nationsounds.com</p>
        <p>Directeur de la publication : Jean Dupont</p>
      </Accordion>

      <Accordion title="Politique de Confidentialité">
        <p>Chez Nation Sounds, nous prenons très au sérieux la confidentialité de vos données personnelles. Nous collectons vos informations dans le but de vous fournir une meilleure expérience utilisateur et pour vous informer de nos événements à venir. Vos données seront stockées de manière sécurisée et ne seront partagées qu'avec des partenaires de confiance dans le cadre de l'organisation du festival.</p>
        <p>Vous avez le droit d'accéder à vos données, de les rectifier ou de demander leur suppression à tout moment en nous contactant à l'adresse email ci-dessus.</p>
      </Accordion>

      <Accordion title="Conditions Générales de Vente">
        <p>Les présentes conditions générales de vente régissent l'achat de billets pour les événements organisés par Nation Sounds. En achetant un billet, vous acceptez ces conditions. Les billets ne sont ni échangeables ni remboursables, sauf en cas d'annulation de l'événement.</p>
        <p>Pour toute question concernant votre achat, veuillez contacter notre service client à l'adresse email contact@nationsounds.com ou par téléphone au 01 34 56 78 90.</p>
      </Accordion>

      <Accordion title="Politique de Cookies">
        <p>Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies nous permettent de mémoriser vos préférences et de suivre votre activité sur notre site. Vous pouvez à tout moment désactiver les cookies en modifiant les paramètres de votre navigateur, cependant cela peut affecter certaines fonctionnalités du site.</p>
        <p>Pour plus d'informations sur notre utilisation des cookies, veuillez lire notre politique complète.</p>
      </Accordion>

      <Accordion title="RGPD">
        <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous avez le droit de demander l'accès aux données personnelles que nous détenons à votre sujet, ainsi que la rectification ou la suppression de ces données. Nous nous engageons à protéger vos informations et à ne les utiliser que dans le cadre des finalités pour lesquelles elles ont été collectées.</p>
        <p>Pour exercer vos droits, veuillez nous contacter par email à contact@nationsounds.com.</p>
      </Accordion>
    </div>
  );
};

export default LegalInformationPage;
