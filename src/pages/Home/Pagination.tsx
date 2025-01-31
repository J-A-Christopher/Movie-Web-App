import { getPageNumbers } from "@/utils/helper_functions";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 py-8  bg-black">
      <button
        onClick={() => !isLoading && onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
          ${
            currentPage === 1 || isLoading
              ? "bg-red-400 text-gray-300 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
      >
        Previous
      </button>

      <div className="hidden sm:flex flex-wrap justify-center items-center gap-2">
        {getPageNumbers(currentPage, totalPages).map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === "number" && !isLoading ? onPageChange(page) : null
            }
            disabled={page === "..." || isLoading}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors
              ${
                typeof page === "number"
                  ? page === currentPage
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-white hover:bg-red-600"
                  : "bg-transparent text-white cursor-default"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="sm:hidden flex items-center gap-2">
        <span className="text-sm text-white">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <button
        onClick={() => !isLoading && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
          ${
            currentPage === totalPages || isLoading
              ? "bg-red-400 text-gray-300 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
