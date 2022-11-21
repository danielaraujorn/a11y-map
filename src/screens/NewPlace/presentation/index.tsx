import { Button, Box, Typography } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LatLngExpression, Map as MapType } from 'leaflet';
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

const isValidator = (role?: RoleEnum) =>
  role && [RoleEnum.ADMIN, RoleEnum.VALIDATOR].includes(role);

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
  validator_comments?: string;
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
  validator_comments,
}: NewPlacePresentationPropType) => {
  const cancelButtonTitle = formatMessage({
    id: 'cancel',
  });
  const submitButtonTitle = formatMessage({
    id: update ? 'save' : 'create',
  });

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
              <Map center={center} whenCreated={setMap} zoomControl={false} />
            </Box>
            <Box mt={3}>
              <MarginWhenMobile>
                <Box marginY={2}>
                  <DeficienciesInput />
                </Box>
                {/* <Box marginY={2}>
                  <SelectInput
                  name="types"
                  multiple
                  labelMessage="type"
                  rules={{ required: true }}
                  options={[
                    { value: 1, label: 'Visual' },
                    { value: 2, label: 'Mobilidade' },
                  ]}
                />
                </Box> */}
                {validator_comments && !isValidator(role) && update && (
                  <Box marginY={2} marginBottom={3}>
                    <Typography variant="caption">
                      {formatMessage({ id: 'places.validator_comments' })}
                      {': '}
                    </Typography>
                    <Typography>{validator_comments}</Typography>
                  </Box>
                )}
                <Box marginY={2}>
                  <Input
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
                <Box marginY={2}>
                  <FileInput
                    name="image"
                    labelMessage="image.upload"
                    rules={{ required: true }}
                    accept=".jgp,.jpeg,.png"
                  />
                </Box>
                {/* <Box marginY={2}>
                  <Input
                    name="image_description"
                    labelMessage="image.description"
                    rules={{ required: true }}
                  />
                </Box> */}
                {isValidator(role) && (
                  <>
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
                    <Box marginY={2}>
                      <Input
                        name="validator_comments"
                        labelMessage="places.validator_comments"
                        multiline
                        minRows={4}
                        maxRows={8}
                      />
                    </Box>
                  </>
                )}
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
              </MarginWhenMobile>
            </Box>
          </Form>
        </FormProvider>
      </MaxWidthContainer>
    </Container>
  );
};
