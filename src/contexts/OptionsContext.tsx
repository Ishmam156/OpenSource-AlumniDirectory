'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DropdownOptions {
  batches: number[];
  countries: string[];
  organizations: string[];
}

interface OptionsContextType {
  options: DropdownOptions;
  loading: boolean;
}

const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

export function OptionsProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<DropdownOptions>({
    batches: [],
    countries: [],
    organizations: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('/api/options');
        const data = await response.json();
        if (response.ok) {
          setOptions(data);
        } else {
          console.error('Failed to fetch options');
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return (
    <OptionsContext.Provider value={{ options, loading }}>
      {children}
    </OptionsContext.Provider>
  );
}

export function useOptions() {
  const context = useContext(OptionsContext);
  if (context === undefined) {
    throw new Error('useOptions must be used within an OptionsProvider');
  }
  return context;
}