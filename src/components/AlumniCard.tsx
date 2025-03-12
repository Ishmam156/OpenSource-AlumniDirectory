'use client';

import { Alumni } from '@/types';
import { FaLinkedin } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';

interface AlumniCardProps {
  alumni: Alumni;
  onReportClick: (alumni: Alumni) => void;
}

export default function AlumniCard({ alumni, onReportClick }: AlumniCardProps) {
  return (
    <div className="bg-[#1e1e1e] backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 flex flex-col h-full border border-[#322b6f]/20">
      <h3 className="text-2xl font-bold text-[#a29abe] mb-6">{alumni.studentName}</h3>
      
      <div className="flex-grow space-y-4 text-gray-300">
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-[#8c82ae]">Batch</span>
          <span className="bg-[#322b6f]/20 px-3 py-1 rounded-full">{alumni.batch}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-[#8c82ae]">Country</span>
          <span className="text-lg">{alumni.countryOfResidence}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-[#8c82ae]">Role</span>
          <span className="text-lg">{alumni.currentRole}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-[#8c82ae]">Organization</span>
          <span className="text-lg">{alumni.organization}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-[#322b6f]/20 flex flex-col sm:flex-row justify-center items-center gap-4">
        {alumni.linkedinUrl && (
          <a
            href={alumni.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-[200px] bg-[#493f7e] text-white py-2 px-4 rounded-lg hover:bg-[#5f558e] transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
          >
            <FaLinkedin className="w-5 h-5" />
            <span>View Profile</span>
          </a>
        )}
        <button
          onClick={() => onReportClick(alumni)}
          className="w-full sm:w-[200px] bg-[#1e1e1e] border border-red-500 text-red-400 py-2 px-4 rounded-lg hover:bg-red-900/20 transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
          title="Report Incorrect Data"
        >
          <MdReport className="w-5 h-5" />
          <span>Report Data</span>
        </button>
      </div>
    </div>
  );
}