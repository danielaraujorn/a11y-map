import { useCallback, useMemo, useState } from 'react';

const PAGE_COUNT_LIMIT = 10;

export type PageProps = {
  page: number;
  count: number;
  onChange: (e: unknown, value: number) => void;
};

export const usePagination = (total = PAGE_COUNT_LIMIT) => {
  const [page, setPage] = useState(1);
  const pageParams = useMemo(
    () => ({
      limit: PAGE_COUNT_LIMIT,
      offset: (page - 1) * PAGE_COUNT_LIMIT,
    }),
    [page]
  );

  const onChange = useCallback((_, value) => setPage(value), []);

  const pageProps = useMemo(
    () => ({ page, count: Math.ceil(total / PAGE_COUNT_LIMIT), onChange }),
    [page, total]
  );
  return {
    pageProps,
    pageParams,
  };
};
