import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1
}) => {
  // Helper function to generate page range
  const generateRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Calculate pages to show
  const getPageList = () => {
    // Always include first and last pages
    const firstPage = 1;
    const lastPage = totalPages;
    
    // Calculate the main range around current page
    const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPage);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPage);

    // Determine if we need to show ellipses
    const shouldShowLeftDots = leftSiblingIndex > firstPage + boundaryCount;
    const shouldShowRightDots = rightSiblingIndex < lastPage - boundaryCount;

    // Build the page list based on conditions
    if (!shouldShowLeftDots && !shouldShowRightDots) {
      // Show all pages when total count is small
      return generateRange(1, totalPages);
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Show left boundary pages + current range + ellipsis + last page
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = generateRange(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      // Show first page + ellipsis + current range + right boundary pages
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = generateRange(totalPages - rightItemCount + 1, totalPages);
      return [1, '...', ...rightRange];
    }

    // Show first page + ellipsis + current range + ellipsis + last page
    const middleRange = generateRange(leftSiblingIndex, rightSiblingIndex);
    return [1, '...', ...middleRange, '...', totalPages];
  };

  // Get the calculated page list
  const pageList = getPageList();

  return (
    <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 px-2 py-4" aria-label="Pagination">
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 sm:p-2 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-indigo-600 hover:text-indigo-600 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      
      {/* Page numbers */}
      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
        {pageList.map((page, index) => {
          if (page === '...') {
            return (
              <span 
                key={`ellipsis-${index}`} 
                className="px-1 sm:px-2 text-gray-400 text-sm sm:text-base"
                aria-hidden="true"
              >
                &hellip;
              </span>
            );
          }
          
          return (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`min-w-[2rem] sm:min-w-[2.5rem] px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-indigo-50'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>
      
      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 sm:p-2 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-indigo-600 hover:text-indigo-600 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </nav>
  );
};

export default Pagination;
