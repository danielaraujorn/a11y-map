import { Button, Box } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LatLngExpression, Map as MapType } from 'leaflet';
import { MessageDescriptor } from 'react-intl';

import { Container } from '../../../components/Container';
import { BackButtonAppBar } from '../../../components/BackButtonAppBar';
import { ButtonContainer } from '../../../components/ButtonContainer';
import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';
import { Map } from '../../../components/Map';
import { MarginWhenMobile } from '../../../components/MarginWhenMobile';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { NewPlaceParamsType } from '../../../types/Forms';
import { SelectInput } from '../../../components/SelectInput';
import { StatusEnum } from '../../../types/Models';
import { paths } from '../../../Navigation/paths';

type NewPlacePresentationPropType = {
  formatMessage: (descriptor: MessageDescriptor) => string;
  methods: UseFormReturn<NewPlaceParamsType>;
  onSubmit: (params: NewPlaceParamsType) => void;
  onCancelButtonClick: () => void;
  setPosition: (map: MapType) => void;
  center?: LatLngExpression;
  update?: boolean;
};

export const NewPlacePresentation = ({
  onCancelButtonClick,
  formatMessage,
  methods,
  setPosition,
  onSubmit,
  center,
  update,
}: NewPlacePresentationPropType) => (
  <Container>
    <BackButtonAppBar
      backButtonPath={update ? paths.places : undefined}
      titleMessage={update ? 'place' : 'newPlace.headerTitle'}
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
            <Map
              center={center}
              onMove={setPosition}
              whenCreated={setPosition}
              zoomControl={false}
            />
          </Box>
          <Box mt={3}>
            <MarginWhenMobile>
              <Box marginY={2}>
                {/* <SelectInput
                  name="types"
                  multiple
                  labelMessage="type"
                  rules={{ required: true }}
                  options={[
                    { value: 1, label: 'Visual' },
                    { value: 2, label: 'Mobilidade' },
                  ]}
                /> */}
              </Box>
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
                  ]}
                />
              </Box>
              <ButtonContainer>
                <Button onClick={onCancelButtonClick}>
                  {formatMessage({ id: 'cancel' })}
                </Button>
                <Button variant="contained" type="submit">
                  {formatMessage({
                    id: update ? 'newPlace.save' : 'newPlace.create',
                  })}
                </Button>
              </ButtonContainer>
            </MarginWhenMobile>
          </Box>
        </Form>
      </FormProvider>
    </MaxWidthContainer>
  </Container>
);
