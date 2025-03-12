'use client';

import { SearchFilters } from '@/types';
import { ClipLoader } from 'react-spinners';
import { Combobox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { useOptions } from '@/contexts/OptionsContext';

interface SearchFormProps {
  filters: SearchFilters;
  onSearch: (filters: SearchFilters) => Promise<void>;
  loading: boolean;
  onFiltersChange: (filters: SearchFilters) => void;
}

interface DropdownOptions {
  batches: number[];
  countries: string[];
  organizations: string[];
}

export default function SearchForm({ filters, onSearch, loading, onFiltersChange }: SearchFormProps) {
  const { options, loading: loadingOptions } = useOptions();
  const [query, setQuery] = useState({ batch: '', country: '', organization: '' });

  const resetQuery = () => {
    setQuery({ batch: '', country: '', organization: '' });
  };

  useEffect(() => {
    if (!filters.batch && !filters.country && !filters.organization && !filters.name) {
      resetQuery();
    } else if (!filters.batch) {
      setQuery(prev => ({ ...prev, batch: '' }));
    }
  }, [filters]);

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading && Object.values(filters).some(value => value !== '' && value !== undefined)) {
      handleSearch();
    }
  };

  const filteredBatches = query.batch === ''
    ? options.batches
    : options.batches.filter((batch) =>
        batch.toString().toLowerCase().includes(query.batch.toLowerCase())
      );

  const filteredCountries = query.country === ''
    ? options.countries
    : options.countries.filter((country) =>
        country.toLowerCase().includes(query.country.toLowerCase())
      );

  const filteredOrganizations = query.organization === ''
    ? options.organizations
    : options.organizations.filter((org) =>
        org.toLowerCase().includes(query.organization.toLowerCase())
      );

  return (
    <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md mb-8 border border-[#322b6f]/20">
      {loadingOptions ? (
        <div className="flex justify-center items-center h-32">
          <ClipLoader size={30} color="#8c82ae" />
          <span className="ml-2 text-gray-400">Loading options...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <div className="relative w-full cursor-default overflow-hidden rounded border border-[#322b6f] bg-[#2d2d2d] text-left">
              <input
                type="text"
                placeholder="Search by name"
                className="w-full border-none p-2 pr-10 text-sm leading-5 text-gray-300 focus:ring-0 bg-[#2d2d2d]"
                value={filters.name}
                onChange={(e) => onFiltersChange({ ...filters, name: e.target.value })}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <Combobox
            value={filters.batch}
            onChange={(value: number | null) => onFiltersChange({ ...filters, batch: value ?? undefined })}
            nullable
          >
            <div className="relative">
              <div className="relative w-full cursor-default overflow-hidden rounded border border-[#322b6f] bg-[#2d2d2d] text-left">
                <Combobox.Input
                  className="w-full border-none p-2 pr-10 text-sm leading-5 text-gray-300 focus:ring-0 bg-[#2d2d2d]"
                  displayValue={() => filters.batch ? filters.batch.toString() : query.batch}
                  onChange={(e) => setQuery({ ...query, batch: e.target.value })}
                  placeholder="Select batch"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </Combobox.Button>
              </div>
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#1e1e1e] py-1 text-base shadow-lg ring-1 ring-[#322b6f] ring-opacity-20 focus:outline-none sm:text-sm">
                {filteredBatches.map((batch) => (
                  <Combobox.Option
                    key={batch}
                    value={batch}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-[#493f7e] text-white' : 'text-gray-300'}`
                    }
                  >
                    {batch}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>

          <Combobox
            value={filters.country}
            onChange={(value: string | null) => onFiltersChange({ ...filters, country: value ?? undefined })}
            nullable
          >
            <div className="relative">
              <div className="relative w-full cursor-default overflow-hidden rounded border border-[#322b6f] bg-[#2d2d2d] text-left">
                <Combobox.Input
                  className="w-full border-none p-2 pr-10 text-sm leading-5 text-gray-300 focus:ring-0 bg-[#2d2d2d]"
                  displayValue={(country: string) => country ?? ''}
                  onChange={(e) => setQuery({ ...query, country: e.target.value })}
                  placeholder="Select country"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </Combobox.Button>
              </div>
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#1e1e1e] py-1 text-base shadow-lg ring-1 ring-[#322b6f] ring-opacity-20 focus:outline-none sm:text-sm">
                {filteredCountries.map((country) => (
                  <Combobox.Option
                    key={country}
                    value={country}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-[#493f7e] text-white' : 'text-gray-300'}`
                    }
                  >
                    {country}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>

          <Combobox
            value={filters.organization}
            onChange={(value: string | null) => onFiltersChange({ ...filters, organization: value ?? undefined })}
            nullable
          >
            <div className="relative">
              <div className="relative w-full cursor-default overflow-hidden rounded border border-[#322b6f] bg-[#2d2d2d] text-left">
                <Combobox.Input
                  className="w-full border-none p-2 pr-10 text-sm leading-5 text-gray-300 focus:ring-0 bg-[#2d2d2d]"
                  displayValue={(org: string) => org ?? ''}
                  onChange={(e) => setQuery({ ...query, organization: e.target.value })}
                  placeholder="Select organization"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </Combobox.Button>
              </div>
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#1e1e1e] py-1 text-base shadow-lg ring-1 ring-[#322b6f] ring-opacity-20 focus:outline-none sm:text-sm">
                {filteredOrganizations.map((org) => (
                  <Combobox.Option
                    key={org}
                    value={org}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-[#493f7e] text-white' : 'text-gray-300'}`
                    }
                  >
                    {org}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        </div>
      )}
      <button
        onClick={handleSearch}
        disabled={loading || !Object.values(filters).some(value => value !== '' && value !== undefined)}
        className="mt-4 bg-[#493f7e] text-white px-6 py-2 rounded hover:bg-[#5f558e] transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Search'}
      </button>
    </div>
  );
}