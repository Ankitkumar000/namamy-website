'use client';

import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: 'relevance', label: 'relevance' },
  { value: 'newest', label: 'newest' },
  { value: 'price', label: 'priceLowToHigh' },
  { value: 'price-desc', label: 'priceHighToLow' },
  { value: 'rating', label: 'topRated' },
  { value: 'popularity', label: 'mostPopular' },
  { value: 'name', label: 'nameAtoZ' },
];

export function ProductSort({ value, onChange }: ProductSortProps) {
  const t = useTranslations('shop.sort');

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-makhana-500 focus:border-transparent min-w-[180px]"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}