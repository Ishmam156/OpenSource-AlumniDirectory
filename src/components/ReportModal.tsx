'use client';

import { Alumni } from '@/types';
import { Dialog } from '@headlessui/react';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  alumni: Alumni | null;
  remark: string;
  onRemarkChange: (value: string) => void;
  onAlumniChange: (alumni: Alumni) => void;
  onSubmit: () => void;
}

export default function ReportModal({
  isOpen,
  onClose,
  alumni,
  remark,
  onRemarkChange,
  onAlumniChange,
  onSubmit
}: ReportModalProps) {
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
            <h3 className="text-lg font-medium text-[#f8fafc] mb-4">Report Incorrect Data</h3>
            <p className="text-sm text-gray-400 mb-4">Edit and input the correct information below:</p>
            <div className="space-y-4">
              {alumni && (
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <label className="w-24 text-sm text-gray-300">Batch:</label>
                    <input
                      type="number"
                      className="flex-1 p-2 border rounded text-gray-300 bg-[#2d2d2d] border-[#322b6f]/30"
                      defaultValue={alumni.batch}
                      onChange={(e) => onAlumniChange({ ...alumni, batch: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-24 text-sm text-gray-300">Name:</label>
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded text-gray-300 bg-[#2d2d2d] border-[#322b6f]/30"
                      defaultValue={alumni.studentName}
                      onChange={(e) => onAlumniChange({ ...alumni, studentName: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-24 text-sm text-gray-300">Country:</label>
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded text-gray-300 bg-[#2d2d2d] border-[#322b6f]/30"
                      defaultValue={alumni.countryOfResidence}
                      onChange={(e) => onAlumniChange({ ...alumni, countryOfResidence: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-24 text-sm text-gray-300">Role:</label>
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded text-gray-300 bg-[#2d2d2d] border-[#322b6f]/30"
                      defaultValue={alumni.currentRole}
                      onChange={(e) => onAlumniChange({ ...alumni, currentRole: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-24 text-sm text-gray-300">Function:</label>
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded text-gray-300 bg-[#2d2d2d] border-[#322b6f]/30"
                      defaultValue={alumni.roleFunction}
                      onChange={(e) => onAlumniChange({ ...alumni, roleFunction: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-24 text-sm text-gray-300">Organization:</label>
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded text-gray-300 bg-[#2d2d2d] border-[#322b6f]/30"
                      defaultValue={alumni.organization}
                      onChange={(e) => onAlumniChange({ ...alumni, organization: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-24 text-sm text-gray-300">LinkedIn:</label>
                    <input
                      type="url"
                      className="flex-1 p-2 border rounded text-gray-300 bg-[#2d2d2d] border-[#322b6f]/30"
                      defaultValue={alumni.linkedinUrl}
                      onChange={(e) => onAlumniChange({ ...alumni, linkedinUrl: e.target.value })}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4">
                <label className="w-24 text-sm text-gray-300">Remark:</label>
                <textarea
                  placeholder="Additional comments or explanation"
                  className="flex-1 p-2 border rounded text-gray-300 bg-[#2d2d2d] border-[#322b6f]/30"
                  rows={4}
                  value={remark}
                  onChange={(e) => onRemarkChange(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}