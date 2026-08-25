import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface AdminPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
}

export function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: AdminPaginationProps) {
  if (totalItems === 0) return null

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const renderPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    return pages
  }

  return (
    <div className="az-admin-pagination" aria-label="Table pagination">
      <div className="az-admin-pagination__info">
        <span>
          Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalItems}</strong> entries
        </span>
        {onPageSizeChange && (
          <div className="az-admin-pagination__page-size">
            <label htmlFor="admin-page-size" className="sr-only">Items per page</label>
            <select
              id="admin-page-size"
              className="az-admin-pagination__select"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              aria-label="Items per page"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} / page
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="az-admin-pagination__controls">
          <button
            type="button"
            className="az-admin-page-btn az-admin-page-btn--nav"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            aria-label="First page"
            title="First page"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            type="button"
            className="az-admin-page-btn az-admin-page-btn--nav"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {renderPageNumbers().map((page, idx) =>
            typeof page === 'number' ? (
              <button
                key={idx}
                type="button"
                className={`az-admin-page-btn ${page === currentPage ? 'az-admin-page-btn--active' : ''}`}
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span key={idx} className="az-admin-page-ellipsis">
                {page}
              </span>
            )
          )}

          <button
            type="button"
            className="az-admin-page-btn az-admin-page-btn--nav"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
            title="Next page"
          >
            <ChevronRight size={16} />
          </button>
          <button
            type="button"
            className="az-admin-page-btn az-admin-page-btn--nav"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            aria-label="Last page"
            title="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
