import React from 'react';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen md:h-2/3-screen lg:h-3/4-screen flex items-center justify-center bg-hero-pattern"
      aria-label="Hero section avec un message de bienvenue et un appel à l'action pour acheter des billets"
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative container mx-auto text-center p-4 md:p-8 rounded">
        <Text content="Bienvenue au Festival Nation Sounds" type="h1" className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg font-concert-title" />
        <Text content="Rejoignez-nous pour une expérience inoubliable" type="p" className="text-lg md:text-2xl mb-8 text-white drop-shadow-lg font-concert-body" />
        <Button
          label="Acheter des billets"
          href="https://www.site-de-billetterie.com"
          className="bg-concert-accent text-white hover:bg-white hover:text-concert-accent"
        />
      </div>
    </section>
  );
};

export default HeroSection;
