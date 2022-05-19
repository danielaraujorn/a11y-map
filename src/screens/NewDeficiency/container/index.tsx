import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { NewDeficiencyParamsType } from '../../../types/Forms';
import { NewDeficiencyPresentation } from '../presentation';
import { DeficiencyType } from '../../../types/Models';
import { paths } from '../../../Navigation/paths';
import { useConfirmation } from '../../../hooks/useConfirmation';
import {
  useDeficiencyPatchRequest,
  useCreateDeficiencyRequest,
} from '../../../api';

const formatDefaultValues = (
  defaultValues?: DeficiencyType
): NewDeficiencyParamsType => {
  const { name = '', description = '' } = defaultValues || {};
  return { name, description };
};

export const NewDeficiencyContainer = ({
  defaultValues,
}: {
  defaultValues?: DeficiencyType;
}) => {
  const update = !!defaultValues;

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const onCancelButtonClick = useCallback(() => {
    navigate(paths.deficiencies);
  }, [navigate]);

  const [{ loading: loadingPatch }, updateFetch] = useDeficiencyPatchRequest();
  const [{ loading: loadingCreate }, createFetch] =
    useCreateDeficiencyRequest();

  const { formatMessage } = useIntl();
  const methods = useForm<NewDeficiencyParamsType>({
    defaultValues: formatDefaultValues(defaultValues),
  });

  const { showConfirmation } = useConfirmation();

  const updateDeficiency = useCallback(
    async (id, params: NewDeficiencyParamsType) => {
      try {
        await updateFetch(id, params);
        enqueueSnackbar(formatMessage({ id: 'success.default.save' }), {
          variant: 'success',
        });
        navigate(paths.deficiencies);
      } catch {
        enqueueSnackbar(formatMessage({ id: 'error.default.save' }), {
          variant: 'error',
        });
      }
    },
    []
  );

  const createDeficiency = useCallback(
    async (params: NewDeficiencyParamsType) => {
      try {
        await createFetch({ params });
        enqueueSnackbar(formatMessage({ id: 'success.default.create' }), {
          variant: 'success',
        });
        navigate(paths.deficiencies);
      } catch {
        enqueueSnackbar(formatMessage({ id: 'error.default.create' }), {
          variant: 'error',
        });
      }
    },
    []
  );

  const askForConfirmation = useCallback(
    async (id: string, params: NewDeficiencyParamsType) => {
      try {
        await showConfirmation({
          title: formatMessage({ id: 'defaultConfirmationQuestion' }),
          description: formatMessage({
            id: 'deficiencies.update.confirmationDescripion',
          }),
        });
        updateDeficiency(id, params);
      } catch (e) {
        return;
      }
    },
    []
  );

  const onSubmit = useCallback(
    (params: NewDeficiencyParamsType) => {
      if (update) {
        askForConfirmation(defaultValues.id, params);
      } else {
        createDeficiency(params);
      }
    },
    [update]
  );

  return (
    <NewDeficiencyPresentation
      update={update}
      loading={loadingPatch || loadingCreate}
      onSubmit={onSubmit}
      methods={methods}
      formatMessage={formatMessage}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};
