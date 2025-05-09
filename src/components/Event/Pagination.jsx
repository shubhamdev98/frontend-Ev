import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-10">
    <nav className="inline-flex rounded-xl shadow-md bg-white border border-gray-200 overflow-hidden">
      
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors border-r ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <ChevronLeft size={18} />
        <span>Previous</span>
      </button>

      {/* Page numbers (hidden on small screens) */}
      <div className="hidden sm:flex">
        {[...Array(totalPages).keys()].map((page) => {
          const pageNum = page + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-r ${
                currentPage === pageNum
                  ? 'bg-indigo-100 text-indigo-700 font-semibold'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Mobile view current page display */}
      <div className="sm:hidden flex items-center px-4 py-2 text-sm text-gray-600 border-r">
        Page {currentPage} of {totalPages}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span>Next</span>
        <ChevronRight size={18} />
      </button>
    </nav>
  </div>
);

export default Pagination;
