import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

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

  const getPagesArray = () => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage == 1) {
      pages = [1, 2, '...', totalPages - 1, totalPages];
    } else if (currentPage <= 3) {
      pages = [1, 2, 3, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, '...', currentPage, '...', totalPages];
    }

    return pages;
  };

  // Determine which arrow to show based on RTL/LTR
  const PreviousIcon = isRTL ? FaChevronRight : FaChevronLeft;
  const NextIcon = isRTL ? FaChevronLeft : FaChevronRight;

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === 1}
        className={`cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 dark:text-white ${
          currentPage === 1 ? 'text-[#DEE2E6] dark:text-gray-400' : 'text-gray-400 dark:text-white'
        }`}
        onClick={() => {
          handlePrevious();
        }}
      >
        <PreviousIcon />
      </Button>
      {getPagesArray().map((page: number | string, index: number) => {
        if (page === '...') {
          return (
            <Button
              key={`ellipsis-${index}`}
              size="sm"
              variant="outline"
              className="cursor-pointer border-gray-300 hover:bg-gray-50 font-bold dark:text-white"
            >
              ...
            </Button>
          );
        }
        return (
          <Button
            key={page}
            size="sm"
            variant="outline"
            className={`cursor-pointer ${
              currentPage === page
                ? 'border-[#4200FF] text-[#4200FF] font-bold dark:text-[#4200FF] dark:border-[#4200FF]'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 font-bold dark:text-white'
            }`}
            onClick={() => {
              onPageChange(page as number);
            }}
          >
            {page}
          </Button>
        );
      })}
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === totalPages}
        className={`cursor-pointer bg-white dark:bg-gray-800 dark:text-white${
          currentPage === totalPages ? 'text-[#DEE2E6]' : 'text-gray-400'
        }`}
        onClick={() => {
          handleNext();
        }}
      >
        <NextIcon />
      </Button>
    </div>
  );
};

export default Pagination;
