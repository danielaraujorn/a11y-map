import { useCallback, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { ArrowLeft } from '@mui/icons-material';
import { useForm, FormProvider } from 'react-hook-form';
import { Map as MapType } from 'leaflet';
import { Container } from '../../../components/Container';
import { Input } from '../../../components/Input';
import { SelectInput } from '../../../components/SelectInput';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { ButtonContainer } from '../../../components/ButtonContainer';
import { MarginWhenMobile } from '../../../components/MarginWhenMobile';
import { Form } from '../../../components/Form';
import { Map } from '../../../components/Map';
import { paths } from '../../../Navigation/paths';

export const NewPointPresentation = () => {
  const navigate = useNavigate();
  const onCancelButtonClick = useCallback(() => {
    navigate(paths.home);
  }, [navigate]);
  const mapPosition = useRef({});
  const { formatMessage } = useIntl();
  const methods = useForm({
    defaultValues: {
      types: [],
      description: '',
      status: 1,
    },
  });
  const { handleSubmit } = methods;
  const onSubmit = useCallback((formData) => {
    const data = { ...formData, location: mapPosition.current };
    console.log(data);
  }, []);
  const setPosition = useCallback((map: MapType) => {
    mapPosition.current = map.getCenter();
  }, []);
  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={onCancelButtonClick}>
            <ArrowLeft />
          </IconButton>
          <Typography component='h1' variant='h6'>
            {formatMessage({ id: 'newPoint.headerTitle' })}
          </Typography>
        </Toolbar>
      </AppBar>
      <MaxWidthContainer>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box
              height={300}
              display='flex'
              justifyContent='center'
              alignItems='center'
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
                onMove={setPosition}
                whenCreated={setPosition}
                zoomControl={false}
              />
            </Box>
            <Box mt={3}>
              <MarginWhenMobile>
                <Box marginY={2}>
                  <SelectInput
                    name='types'
                    multiple
                    labelMessage='type'
                    rules={{ required: true }}
                    options={[
                      { value: 1, label: 'Visual' },
                      { value: 2, label: 'Mobilidade' },
                    ]}
                  />
                </Box>
                <Box marginY={2}>
                  <Input
                    name='description'
                    labelMessage='description'
                    rules={{ required: true }}
                    multiline
                    minRows={4}
                    maxRows={8}
                  />
                </Box>
                <Box marginY={2}>
                  <SelectInput
                    name='status'
                    labelMessage='status'
                    rules={{ required: true }}
                    options={[{ value: 1, label: 'Pendente' }]}
                  />
                </Box>
                <ButtonContainer>
                  <Button onClick={onCancelButtonClick}>
                    {formatMessage({ id: 'cancel' })}
                  </Button>
                  <Button variant='contained' type='submit'>
                    {formatMessage({ id: 'newPoint.create' })}
                  </Button>
                </ButtonContainer>
              </MarginWhenMobile>
            </Box>
          </Form>
        </FormProvider>
      </MaxWidthContainer>
    </Container>
  );
};
