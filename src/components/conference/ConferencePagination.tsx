import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ConferencePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function ConferencePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: ConferencePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  // Generate page numbers
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className={`az-pagination-wrapper ${className}`}
      aria-label="Conference listing pagination"
    >
      <div className="az-pagination">
        <button
          type="button"
          className="az-page az-page--nav"
          disabled={currentPage === 1}
          onClick={handlePrevious}
          aria-label="Go to previous page"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span>Previous</span>
        </button>

        <div className="az-pagination__pages" role="group" aria-label="Page numbers">
          {pages.map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                className={`az-page ${isActive ? 'az-page--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${pageNum}${isActive ? ', current page' : ''}`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="az-page az-page--nav"
          disabled={currentPage === totalPages}
          onClick={handleNext}
          aria-label="Go to next page"
        >
          <span>Next</span>
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}

export default ConferencePagination;
