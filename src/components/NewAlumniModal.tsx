'use client';

import { Alumni } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface NewAlumniModalProps {
  isOpen: boolean;
  onClose: () => void;
  alumni: Alumni | null;
  remark: string;
  onRemarkChange: (value: string) => void;
  onAlumniChange: (alumni: Alumni) => void;
  onSubmit: () => void;
}

export default function NewAlumniModal({
  isOpen,
  onClose,
  alumni,
  remark,
  onRemarkChange,
  onAlumniChange,
  onSubmit
}: NewAlumniModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="relative bg-[#1e1e1e] rounded-lg p-8 max-w-md w-full mx-4 border border-[#322b6f]/20">
          <h3 className="text-lg font-bold text-[#f8fafc] mb-4">Add New Alumni</h3>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Batch"
              className="w-full p-2 border rounded"
              min={1}
              max={32}
              value={alumni?.batch || ''}
              onChange={(e) => onAlumniChange({
                ...alumni!,
                batch: parseInt(e.target.value) || 0
              })}
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={alumni?.studentName || ''}
              onChange={(e) => onAlumniChange({
                ...alumni!,
                studentName: e.target.value
              })}
            />
            <input
              type="text"
              placeholder="Country of Residence"
              className="w-full p-2 border rounded"
              value={alumni?.countryOfResidence || ''}
              onChange={(e) => onAlumniChange({
                ...alumni!,
                countryOfResidence: e.target.value
              })}
            />
            <input
              type="text"
              placeholder="Current Role"
              className="w-full p-2 border rounded"
              value={alumni?.currentRole || ''}
              onChange={(e) => onAlumniChange({
                ...alumni!,
                currentRole: e.target.value
              })}
            />
            <input
              type="text"
              placeholder="Role Function"
              className="w-full p-2 border rounded"
              value={alumni?.roleFunction || ''}
              onChange={(e) => onAlumniChange({
                ...alumni!,
                roleFunction: e.target.value
              })}
            />
            <input
              type="text"
              placeholder="Organization"
              className="w-full p-2 border rounded"
              value={alumni?.organization || ''}
              onChange={(e) => onAlumniChange({
                ...alumni!,
                organization: e.target.value
              })}
            />
            <input
              type="url"
              placeholder="LinkedIn URL"
              className="w-full p-2 border rounded"
              value={alumni?.linkedinUrl || ''}
              onChange={(e) => onAlumniChange({
                ...alumni!,
                linkedinUrl: e.target.value
              })}
            />
            <textarea
              placeholder="Additional Information"
              className="w-full p-2 border rounded text-gray-300 bg-[#2d2d2d] border-[#322b6f]/30"
              rows={4}
              value={remark}
              onChange={(e) => onRemarkChange(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                className="px-4 py-2 bg-[#322b6f] text-white rounded hover:bg-[#322b6f]/80 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      </Dialog>
    </Transition>
  );
}