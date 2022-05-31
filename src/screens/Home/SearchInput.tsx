import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { Autocomplete, alpha, InputAdornment, TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { useGeolocation } from '../../hooks/useGeolocation';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  marginLeft: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    width: 500,
  },
}));

const params = {
  token: process.env.REACT_APP_ARCGIS_API_KEY,
  f: 'pjson',
};

export type CandidateType = {
  address: string;
  location: { x: number; y: number };
};

export const SearchInput = ({
  onChange,
}: {
  onChange?: (value: CandidateType | undefined | null | string) => void;
}) => {
  const [value, setValue] = useState<
    CandidateType | undefined | null | string
  >();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedText] = useDebounce(text, 1000);
  const { formatMessage } = useIntl();
  const { location } = useGeolocation();
  const { lat, lng } = location;
  const [{ data }, request] = useAxios<{
    candidates: CandidateType[];
  }>(
    'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates',
    { manual: true }
  );
  const locations = data?.candidates?.slice(0, 5) || [];
  useEffect(() => {
    request({
      params: {
        ...params,
        SingleLine: debouncedText,
        location: `${lat},${lng}`,
      },
    }).then(() => {
      setLoading(false);
    });
  }, [debouncedText, setLoading]);

  return (
    <Search>
      <Autocomplete
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
          onChange?.(newValue);
        }}
        noOptionsText={formatMessage({ id: 'no_options_found' })}
        loadingText={formatMessage({ id: 'loading...' })}
        freeSolo
        loading={loading}
        options={locations}
        getOptionLabel={option =>
          typeof option === 'string' ? option : option.address
        }
        inputValue={text}
        onInputChange={(_, value) => {
          setText(value);
          setLoading(true);
        }}
        renderInput={params => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder={formatMessage({ id: 'places.search_place' })}
          />
        )}
      />
    </Search>
  );
};
