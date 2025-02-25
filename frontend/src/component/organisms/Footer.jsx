import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faSnapchatGhost, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Text from '../atoms/Text';
import NavItem from '../molecules/NavItem';
import axios from '../../config/axiosConfig';
import Button from '../atoms/Button';

const Footer = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    try {
      await axios.post('/api/newsletter/subscribe', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
    });
        setStatus('Inscription réussie!');
        setFormData({ firstName: '', lastName: '', email: '' });
    } catch (error) {
        setStatus('Erreur lors de l\'inscription.');
    } finally {
        setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus('');
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [status]);

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-2">À Propos de Nation Sounds</h3>
            <Text content="Nation Sounds est un festival de musique annuel qui se déroule dans la ville de Paris. Rejoignez-nous pour une expérience inoubliable." type="p" className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <Text content="Mail: contact@nationsounds.com" type="p" className="text-white" />
            <Text content="Adresse: 123 rue de la musique" type="p" className="text-white" />
            <Text content="Téléphone: 01 34 56 78 90" type="p" className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Newsletter</h3>
            <form className="max-w-sm mx-auto" onSubmit={handleSubscribe}>
              <input
                type="text"
                name="firstName"
                placeholder="Votre prénom"
                className="p-2 rounded text-black w-full mb-2"
                aria-label="Prénom"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Votre nom"
                className="p-2 rounded text-black w-full mb-2"
                aria-label="Nom"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                className="p-2 rounded text-black w-full mb-2"
                aria-label="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <Button
                label={isSubmitting ? "En cours..." : "S'inscrire"}
                type="submit"
                disabled={isSubmitting}
              />
            </form>
            {status && (
              <p className={`mt-2 text-center ${status === 'Inscription réussie!' ? 'text-light-blue' : 'text-error-red'}`}>
                {status}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Informations légales</h3>
            <ul>
              <li><NavItem label="Mentions légales" href="/legal" className="text-white hover:text-gray-400" /></li>
              <li><NavItem label="Politique de confidentialité"  className="text-white hover:text-gray-400" /></li>
              <li><NavItem label="Conditions générales de vente"  className="text-white hover:text-gray-400" /></li>
              <li><NavItem label="Politique de cookies"  className="text-white hover:text-gray-400" /></li>
              <li><NavItem label="RGPD" className="text-white hover:text-gray-400" /></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Réseaux sociaux</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-gray-400" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-gray-400" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-gray-400" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-gray-400" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://snapchat.com" className="text-white hover:text-gray-400" aria-label="Snapchat">
                <FontAwesomeIcon icon={faSnapchatGhost} />
              </a>
              <a href="https://youtube.com" className="text-white hover:text-gray-400" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Text content="© 2024 Nation Sounds Festival. Tous droits réservés." type="p" className="text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
