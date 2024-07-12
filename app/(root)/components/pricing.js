import { Card } from '@/components/ui/card';
import React from 'react';

const pricingPlans = [
  { plan: 'Basic', price: '$10/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
  { plan: 'Pro', price: '$20/month', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
  { plan: 'Enterprise', price: 'Contact Us', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'] },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{plan.plan}</h3>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index} className="mb-2">{feature}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
