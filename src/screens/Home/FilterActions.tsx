import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { FilterAlt } from '@mui/icons-material';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { PlacesFilterType } from '../../api/places';
import { StatusEnum } from '../../types/Models';

export const FilterActions = ({
  filter,
  setFilter,
}: {
  filter: PlacesFilterType;
  setFilter: Dispatch<SetStateAction<PlacesFilterType>>;
}) => {
  const { formatMessage } = useIntl();
  const filterInProgressPlacesTitle = formatMessage({
    id: 'place.filter_not_validated',
  });
  const [filterAnchorEl, setFilterAnchorEl] = useState<
    HTMLButtonElement | undefined
  >(undefined);
  const handleFilter = (event: MouseEvent<HTMLButtonElement>) =>
    setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(undefined);
  const onToggleFilter = useCallback(() => {
    setFilter(prev => ({
      statuses: prev.statuses?.includes(StatusEnum.VALIDATED)
        ? [StatusEnum.IN_PROGRESS]
        : [
            StatusEnum.IN_PROGRESS,
            StatusEnum.NEED_CHANGES,
            StatusEnum.VALIDATED,
          ],
    }));
    handleFilterClose();
  }, [setFilter]);

  const filterSelected = !filter?.statuses?.includes(StatusEnum.VALIDATED);

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label={formatMessage({ id: 'menu.open' })}
        sx={{ ml: 2 }}
        onClick={handleFilter}
      >
        <Badge badgeContent={filterSelected ? 1 : 0} color="secondary">
          <FilterAlt />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={filterAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={'account-primary-menu'}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem sx={{ pr: 3 }}>
          <FormControlLabel
            onClick={onToggleFilter}
            control={
              <Checkbox
                inputProps={{
                  'aria-label': filterInProgressPlacesTitle,
                }}
                checked={filterSelected}
              />
            }
            label={filterInProgressPlacesTitle}
          />
        </MenuItem>
      </Menu>
    </>
  );
};
