'use client';

import { useState, useEffect } from 'react';
import { Alumni, SearchFilters } from '@/types';
import { ToastContainer, toast } from 'react-toastify';
import SearchForm from '@/components/SearchForm';
import { OptionsProvider } from '@/contexts/OptionsContext';
import AlumniCard from '@/components/AlumniCard';
import ReportModal from '@/components/ReportModal';
import NewAlumniModal from '@/components/NewAlumniModal';
import Pagination from '@/components/Pagination';
import ScrollToTop from '@/components/ScrollToTop';
import { ClipLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    name: '',
    batch: undefined,
    country: '',
    organization: ''
  });
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalSearches, setTotalSearches] = useState<number | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showNewAlumniModal, setShowNewAlumniModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [remark, setRemark] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    fetchSearchStats();
  }, []);

  const fetchSearchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setTotalSearches(data.totalSearches);
    } catch (error) {
      console.error('Error fetching search stats:', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const params = new URLSearchParams();
      if (filters.name) params.append('name', filters.name);
      if (filters.batch) params.append('batch', filters.batch.toString());
      if (filters.country) params.append('country', filters.country);
      if (filters.organization) params.append('organization', filters.organization);

      const response = await fetch(`/api/sheets?${params}`);
      const data = await response.json();

      if (response.ok) {
        setAlumni(data);
        // Update search count
        await fetch('/api/stats', { method: 'POST' });
        await fetchSearchStats();
        // Reset filters after successful search
        setFilters({
          name: '',
          batch: undefined,
          country: '',
          organization: ''
        });
      } else {
        toast.error('Failed to fetch alumni data');
      }
    } catch (error) {
      toast.error('An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async () => {
    if (!selectedAlumni || !remark) {
      toast.error('Please provide a remark');
      return;
    }

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'report',
          data: { alumni: selectedAlumni, remark }
        })
      });

      if (response.ok) {
        toast.success('Report submitted successfully');
        setShowReportModal(false);
        setRemark('');
      } else {
        toast.error('Failed to submit report');
      }
    } catch (error) {
      toast.error('An error occurred while submitting the report');
    }
  };

  const handleNewAlumni = async () => {
    if (!selectedAlumni || !selectedAlumni.studentName || !selectedAlumni.batch || !selectedAlumni.countryOfResidence || !selectedAlumni.currentRole || !selectedAlumni.roleFunction || !selectedAlumni.organization) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'new',
          data: { alumni: selectedAlumni, remark }
        })
      });

      if (response.ok) {
        toast.success('New alumni information submitted successfully');
        setShowNewAlumniModal(false);
        setSelectedAlumni(null);
        setRemark('');
      } else {
        toast.error('Failed to submit new alumni information');
      }
    } catch (error) {
      toast.error('An error occurred while submitting new alumni information');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedAlumni = alumni.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="min-h-screen p-8 flex flex-col">
      <ToastContainer />
      <ScrollToTop />
      <div className="max-w-6xl mx-auto text-center flex-grow">
        <h1 className="text-4xl font-bold text-[#a29abe] mb-8">IBA BBA Alumni Directory</h1>
        
        {/* Search Stats */}
        <div className="mb-8 text-gray-400">
          {totalSearches === null ? (
            <i>Loading total alumni searches...</i>
          ) : (
            <i>Alumni searches till date: <b>{totalSearches?.toLocaleString()}</b></i>
          )}
        </div>


        {/* Search Form */}
        <div className="flex justify-center mb-8">
          <OptionsProvider>
            <SearchForm 
              filters={filters}
              onFiltersChange={setFilters}
              onSearch={handleSearch} 
              loading={loading} 
            />
          </OptionsProvider>
        </div>

        {/* Results Grid */}
        {alumni.length > 0 ? (
          <>
            <div className="mb-4 text-gray-400 italic">
              <span className="font-normal">
                <span className="font-bold">{alumni.length}</span> alumni found matching the search parameters.
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedAlumni.map((alum, index) => (
                <AlumniCard
                  key={index}
                  alumni={alum}
                  onReportClick={(alum) => {
                    setSelectedAlumni(alum);
                    setShowReportModal(true);
                  }}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalItems={alumni.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md text-center border border-[#322b6f]/20">
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <ClipLoader size={20} color="#2563eb" />
                <p className="text-gray-300 text-lg">Searching...</p>
              </div>
            ) : hasSearched ? (
              <p className="text-gray-300 text-lg">No alumni found matching your search parameters.</p>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-300 text-lg">Welcome to the IBA BBA Alumni Directory!</p>
                <p className="text-gray-400">Use the search form above to find alumni by name, batch, country, or organization.</p>
              </div>
            )}
          </div>
        )}

        {/* Add New Alumni Button */}
        <div className="flex justify-center my-8">
          <button
            onClick={() => {
              setSelectedAlumni({
                batch: 0,
                studentName: '',
                countryOfResidence: '',
                currentRole: '',
                roleFunction: '',
                organization: '',
                linkedinUrl: ''
              });
              setShowNewAlumniModal(true);
            }}
            className="bg-[#322b6f] text-white px-6 py-2 rounded hover:bg-[#322b6f]/80 transition-colors duration-300"
          >
            Add New Alumni
          </button>
        </div>

        {/* Footer */}
        <div className="text-gray-400 text-sm mt-auto">
          <i>The directory is updated with information of batches starting from <b>1st</b> till <b>28th</b>.</i>
          <br />
          <i>A special thank you to all the <b>admins in BBA Group</b> who helped out with the initial data collection!</i>
          <br />
          <br />
          <i>Made with love for the <b>IBA BBA</b> community❤️</i>
        </div>

        {/* Modals */}
        <ReportModal
          isOpen={showReportModal}
          onClose={() => {
            setShowReportModal(false);
            setRemark('');
          }}
          alumni={selectedAlumni}
          remark={remark}
          onRemarkChange={setRemark}
          onAlumniChange={setSelectedAlumni}
          onSubmit={handleReport}
        />

        <NewAlumniModal
          isOpen={showNewAlumniModal}
          onClose={() => setShowNewAlumniModal(false)}
          alumni={selectedAlumni}
          remark={remark}
          onRemarkChange={setRemark}
          onAlumniChange={setSelectedAlumni}
          onSubmit={handleNewAlumni}
        />
      </div>
    </main>
  );
}
