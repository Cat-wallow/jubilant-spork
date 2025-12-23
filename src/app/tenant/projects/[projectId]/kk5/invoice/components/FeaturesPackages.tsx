'use client';

import { Check } from 'lucide-react';

interface Package {
  name: string;
  description: string;
  badge: string;
  price: string;
}

interface FeaturesPackagesProps {
  features: string[];
  packages: Package[];
}

export function FeaturesPackages({ features, packages }: FeaturesPackagesProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Features */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="mb-6 text-base font-bold text-gray-900">Fitur Invoice</h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
              <span className="text-sm font-normal text-gray-900">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Packages */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="mb-6 text-base font-bold text-gray-900">Paket Layanan & Harga</h3>
        <div className="space-y-3">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
            >
              <div>
                <p className="text-base font-normal text-gray-900">{pkg.name}</p>
                <p className="text-xs text-gray-600">{pkg.description}</p>
                <span className="mt-2 inline-block rounded-lg border border-gray-200 px-2 py-1 text-xs font-normal text-gray-900">
                  {pkg.badge}
                </span>
              </div>
              <p className="text-base font-normal text-green-600">{pkg.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
