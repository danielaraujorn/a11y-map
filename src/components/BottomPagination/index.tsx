import { Box, Pagination } from '@mui/material';

import { PageProps } from '../../hooks/usePagination';

export const BottomPagination = (pageProps: PageProps) => (
  <>
    {pageProps.count > 1 && (
      <Box mt={3}>
        <Pagination {...pageProps} />
      </Box>
    )}
  </>
);
