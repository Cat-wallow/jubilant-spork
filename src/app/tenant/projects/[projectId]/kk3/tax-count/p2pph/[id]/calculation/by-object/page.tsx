'use client';

import { CategoryCard } from './_components/CategoryCard';
import { taxCategoriesData } from './_data/mock-data';

export default function ByObjectPage() {
  return (
    <div className="space-y-6">
      {taxCategoriesData.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
  );
}
