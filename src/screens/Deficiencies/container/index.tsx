import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { DeficienciesPresentation } from '../presentation';
import { api } from '../../../api';
import { paths } from '../../../Navigation/paths';
import { usePagination } from '../../../hooks/usePagination';

export const DeficienciesContainer = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const onAddButtonClick = useCallback(() => {
    navigate(paths.newDeficiency);
  }, [navigate]);

  const [{ data, loading: loadingUsers }, getUsers] = api.deficiencies.useList({
    manual: true,
  });

  const deficiencies = data?.data?.deficiencies || [];

  const { pageProps, pageParams } = usePagination(data?.total);

  const [debouncedName] = useDebounce(name, 1000);

  useEffect(() => {
    getUsers({
      params: {
        ...(debouncedName ? { name: debouncedName } : {}),
        ...pageParams,
      },
    });
  }, [debouncedName, pageParams]);

  return (
    <DeficienciesPresentation
      pageProps={pageProps}
      onAddButtonClick={onAddButtonClick}
      navigate={navigate}
      formatMessage={formatMessage}
      deficiencies={deficiencies}
      loading={loadingUsers}
      name={name}
      setName={setName}
    />
  );
};
