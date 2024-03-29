import { Button, Box, Typography } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LatLngExpression, Map as MapType } from 'leaflet';
import { Marker } from 'react-leaflet';
import { LoadingButton } from '@mui/lab';
import { MessageDescriptor } from 'react-intl';

import { Container } from '../../../components/Container';
import { ButtonContainer } from '../../../components/ButtonContainer';
import { DeficienciesInput } from '../../../components/DeficienciesInput';
import { Form } from '../../../components/Form';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { Map } from '../../../components/Map';
import { MarginWhenMobile } from '../../../components/MarginWhenMobile';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { NewPlaceParamsType } from '../../../types/Forms';
import { BarrierLevelEnum, RoleEnum, StatusEnum } from '../../../types/Models';
import { SelectInput } from '../../../components/SelectInput';
import { paths } from '../../../Navigation/paths';
import { FileInput } from '../../../components/FileInput';
import { getIcon } from '../../Home/presentation';
import { isValidator } from '../../../utils/isValidator';

type NewPlacePresentationPropType = {
  formatMessage: (descriptor: MessageDescriptor) => string;
  methods: UseFormReturn<NewPlaceParamsType>;
  onSubmit: (params: NewPlaceParamsType) => void;
  onCancelButtonClick: () => void;
  setMap: (map: MapType) => void;
  center?: LatLngExpression;
  update?: boolean;
  loading?: boolean;
  role?: RoleEnum;
  mine: boolean;
  hasDefaultFile?: boolean;
};

export const NewPlacePresentation = ({
  onCancelButtonClick,
  formatMessage,
  methods,
  setMap,
  onSubmit,
  center,
  update,
  loading,
  role,
  mine,
  hasDefaultFile,
}: NewPlacePresentationPropType) => {
  const cancelButtonTitle = formatMessage({
    id: 'cancel',
  });
  const submitButtonTitle = formatMessage({
    id: update ? 'save' : 'create',
  });
  const { watch } = methods;
  const { barrier_level, status, validator_comments } = watch();

  const canEdit =
    !update || (mine && status !== StatusEnum.VALIDATED) || isValidator(role);

  return (
    <Container>
      <Header
        backButtonPath={update ? paths.places : paths.home}
        titleMessage={update ? 'place' : 'place.new.headerTitle'}
      />
      <MaxWidthContainer>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box
              height={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {canEdit && (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: 'blue',
                    borderRadius: 5,
                    zIndex: 2000,
                    position: 'absolute',
                  }}
                />
              )}
              <Map center={center} whenCreated={setMap}>
                {canEdit ? (
                  <></>
                ) : (
                  <Marker
                    icon={getIcon({ barrier_level, status })}
                    position={center || [0, 0]}
                  />
                )}
              </Map>
            </Box>
            <Box mt={3}>
              <MarginWhenMobile>
                {validator_comments &&
                  !isValidator(role) &&
                  mine &&
                  status !== StatusEnum.VALIDATED && (
                    <Box marginY={2} marginBottom={3}>
                      <Typography variant="caption">
                        {formatMessage({ id: 'places.validator_comments' })}
                        {': '}
                      </Typography>
                      <Typography>{validator_comments}</Typography>
                    </Box>
                  )}
                <Box marginY={2}>
                  <FileInput
                    name="image"
                    labelMessage="image.upload"
                    rules={{ required: !hasDefaultFile }}
                    accept=".jgp,.jpeg,.png"
                    disabled={!canEdit}
                  />
                </Box>
                <Box marginY={2}>
                  <DeficienciesInput disabled={!canEdit} />
                </Box>
                <Box marginY={2}>
                  <Input
                    disabled={!canEdit}
                    name="description"
                    labelMessage="description"
                    rules={{ required: true }}
                    multiline
                    minRows={4}
                    maxRows={8}
                  />
                </Box>
                <Box marginY={2}>
                  <SelectInput
                    name="barrier_level"
                    labelMessage="barrier.classification"
                    rules={{ required: true }}
                    disabled={!canEdit}
                    options={[
                      {
                        value: BarrierLevelEnum.BAD,
                        label: formatMessage({ id: 'barrier.bad' }),
                      },
                      {
                        value: BarrierLevelEnum.DIFFICULT,
                        label: formatMessage({ id: 'barrier.difficult' }),
                      },
                      {
                        value: BarrierLevelEnum.GOOD,
                        label: formatMessage({ id: 'barrier.good' }),
                      },
                    ]}
                  />
                </Box>
                {isValidator(role) && (
                  <Box marginY={2}>
                    <SelectInput
                      name="status"
                      labelMessage="status"
                      rules={{ required: true }}
                      options={[
                        {
                          value: StatusEnum.IN_PROGRESS,
                          label: formatMessage({ id: 'status.inProgress' }),
                        },
                        {
                          value: StatusEnum.VALIDATED,
                          label: formatMessage({ id: 'status.validated' }),
                        },
                        {
                          value: StatusEnum.NEED_CHANGES,
                          label: formatMessage({ id: 'status.needChanges' }),
                        },
                        {
                          value: StatusEnum.INVALIDATED,
                          label: formatMessage({ id: 'status.invalidated' }),
                        },
                      ]}
                    />
                  </Box>
                )}
                {isValidator(role) && (
                  <Box marginY={2}>
                    <Input
                      disabled={!isValidator(role)}
                      name="validator_comments"
                      labelMessage="places.validator_comments"
                      multiline
                      minRows={4}
                      maxRows={8}
                    />
                  </Box>
                )}
                {canEdit && (
                  <ButtonContainer>
                    <Button
                      aria-label={cancelButtonTitle}
                      disabled={loading}
                      onClick={onCancelButtonClick}
                    >
                      {cancelButtonTitle}
                    </Button>
                    <LoadingButton
                      aria-label={submitButtonTitle}
                      loading={loading}
                      variant="contained"
                      type="submit"
                    >
                      {submitButtonTitle}
                    </LoadingButton>
                  </ButtonContainer>
                )}
              </MarginWhenMobile>
            </Box>
          </Form>
        </FormProvider>
      </MaxWidthContainer>
    </Container>
  );
};
