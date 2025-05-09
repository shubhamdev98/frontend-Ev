import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-8">
    <nav className="inline-flex rounded-md shadow">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`inline-flex items-center px-4 py-2 rounded-l-md border ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        } text-sm font-medium`}
      >
        <ChevronLeft size={18} className="mr-1" />
        Previous
      </button>

      <div className="hidden sm:flex">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => onPageChange(page + 1)}
            className={`inline-flex items-center px-4 py-2 border-t border-b ${
              currentPage === page + 1
                ? 'bg-indigo-50 text-indigo-600 border-indigo-200 z-10'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } text-sm font-medium`}
          >
            {page + 1}
          </button>
        ))}
      </div>

      <div className="sm:hidden inline-flex items-center px-4 py-2 border-t border-b bg-white text-gray-700 text-sm font-medium">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`inline-flex items-center px-4 py-2 rounded-r-md border ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        } text-sm font-medium`}
      >
        Next
        <ChevronRight size={18} className="ml-1" />
      </button>
    </nav>
  </div>
);

export default Pagination;
