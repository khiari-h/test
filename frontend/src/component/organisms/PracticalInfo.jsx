import React, { useEffect, useState } from 'react';
import Text from '../atoms/Text';
import Accordion from '../molecules/Accordion';
import practicalInfoData from '../../data/practicalInfoData.json';

const PracticalInfo = () => {
  const [practicalInfo, setPracticalInfo] = useState([]);

  useEffect(() => {
    setPracticalInfo(practicalInfoData.sections);
  }, []);

  // Les informations pratiques sont récupérés depuis le fichier json 
  return (
    <section className="py-12" aria-labelledby="practical-info-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Text content="Infos Pratiques et FAQ" type="h2" className="h2-class mb-8 text-center" id="practical-info-heading" />
        <div className="space-y-8">
          {practicalInfo.map((section, index) => (
            <Accordion key={index} title={section.title}>
              <div className="text-custom-gray-700 space-y-4">
                <p className="text-lg leading-relaxed p-class">{section.content}</p>
                {section.faqItems && (
                  <div className="mt-4 space-y-2">
                    {section.faqItems.map((item, faqIndex) => (
                      <Accordion key={faqIndex} title={item.question}>
                        <p className="text-base leading-relaxed p-class">{item.answer}</p>
                      </Accordion>
                    ))}
                  </div>
                )}
              </div>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticalInfo;
