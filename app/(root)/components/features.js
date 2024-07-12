import { Card } from '@/components/ui/card';
import React from 'react';

const features = [
  { title: 'Easy to Use', description: 'Intuitive interface for quick video creation.' },
  { title: 'High Quality', description: 'Produce videos in stunning 4K resolution.' },
  { title: 'Fast Rendering', description: 'Render videos in a matter of minutes.' },
];

const Features = () => {
  return (
    <section id="features" className="bg-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
