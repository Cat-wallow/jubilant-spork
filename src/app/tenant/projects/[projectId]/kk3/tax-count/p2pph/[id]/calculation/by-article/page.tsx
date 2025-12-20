'use client';

import { allPphDetails } from '../../_data/dummy-data';
import { PphArticleCard } from '../../_components/PphArticleCard';

export default function ByArticlePage() {
  return (
    <div className="flex flex-col gap-[30px]">
      {allPphDetails.map((pphDetail, index) => (
        <PphArticleCard key={index} data={pphDetail} />
      ))}
    </div>
  );
}
