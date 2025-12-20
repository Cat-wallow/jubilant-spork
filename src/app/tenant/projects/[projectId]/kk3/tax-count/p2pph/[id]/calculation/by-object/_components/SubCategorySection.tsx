'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TaxSubCategory } from '../_data/mock-data';
import { TransactionTable } from './TransactionTable';

interface SubCategorySectionProps {
  subCategory: TaxSubCategory;
}

export function SubCategorySection({ subCategory }: SubCategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-[10px] border-[0.8px] border-black/10">
      {/* Subcategory Header */}
      <div
        className="flex cursor-pointer items-center justify-between rounded-t-[10px] bg-[#ECEEF0]/20 px-2 py-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <span className="text-base text-[#0A0A0A]">{subCategory.name}</span>
          <span className="text-sm text-[#717182]">({subCategory.transactionCount} transaksi)</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-[#717182]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#717182]" />
          )}
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-base text-[#0A0A0A]">
            Rp {subCategory.totalTax.toLocaleString('id-ID')}
          </span>
          <span className="text-xs text-[#717182]">
            dari Rp {subCategory.totalAmount.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Transaction Details */}
      {isExpanded && subCategory.transactions.length > 0 && (
        <div className="border-t border-black bg-white p-3">
          <h4 className="mb-3 text-sm text-[#717182]">
            Detail Transaksi {subCategory.name}
          </h4>
          <TransactionTable transactions={subCategory.transactions} />
        </div>
      )}
    </div>
  );
}
