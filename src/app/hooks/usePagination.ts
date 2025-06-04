import { useCallback, useState } from 'react';

interface PaginationOptions {
  page?: number;
  limit?: number;
  totalItems?: number;
}

/**
 * Hook to manage pagination, it returns the current page, limit, and methods to change them
 * and also handle page range on limit change
 * like if the current page is 2 and limit is 10, then on limit change to 2, the page should be 6
 */
export default function usePagination(options?: PaginationOptions) {
  const [{ page, limit }, setPagination] = useState({
    page: options?.page || 1,
    limit: options?.limit || 10,
  });
  const [totalItems, setTotalItems] = useState(options?.totalItems || 0);

  const setPage = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const setLimit = useCallback(
    (newLimit: number) => {
      setPagination((prev) => {
        // and calculate the new page based on the current page and limit, so the first item of the current page
        // should be awailable on the new page
        const newPage =
          prev.page > 1
            ? Math.ceil(((prev.page - 1) * prev.limit + 1) / newLimit)
            : 1;

        return {
          page: newPage,
          limit: newLimit,
        };
      });
    },
    [totalItems]
  );

  return {
    page,
    limit,
    setPage,
    setLimit,
    setTotalItems,
  };
}
