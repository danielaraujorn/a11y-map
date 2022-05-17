import { Button, Box } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { MessageDescriptor } from 'react-intl';

import { ButtonContainer } from '../../../components/ButtonContainer';
import { Container } from '../../../components/Container';
import { Form } from '../../../components/Form';
import { MarginWhenMobile } from '../../../components/MarginWhenMobile';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import {
  PasswordInput,
  PasswordConfirmationInput,
} from '../../../components/PasswordInput';
import { NewPasswordParamsType } from '../../../types/Forms';
import { Title } from '../../../components/Title';
import { VerticalCenter } from '../../../components/VerticalCenter';

type NewPasswordPresentationPropType = {
  formatMessage: (descriptor: MessageDescriptor) => string;
  methods: UseFormReturn<NewPasswordParamsType>;
  onSubmit: (params: NewPasswordParamsType) => void;
  onSecondaryClick: () => void;
  loading?: boolean;
};

export const NewPasswordPresentation = ({
  loading,
  formatMessage,
  methods,
  onSubmit,
  onSecondaryClick,
}: NewPasswordPresentationPropType) => (
  <Container>
    <VerticalCenter>
      <MaxWidthContainer>
        <MarginWhenMobile>
          <Box mb={4}>
            <Title>{formatMessage({ id: 'auth.newPassword' })}</Title>
          </Box>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Box marginY={2}>
                <PasswordInput />
              </Box>
              <Box marginY={2}>
                <PasswordConfirmationInput />
              </Box>
              <ButtonContainer>
                <Button disabled={loading} onClick={onSecondaryClick}>
                  {formatMessage({ id: 'auth.goToLogin' })}
                </Button>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                >
                  {formatMessage({ id: 'save' })}
                </LoadingButton>
              </ButtonContainer>
            </Form>
          </FormProvider>
        </MarginWhenMobile>
      </MaxWidthContainer>
    </VerticalCenter>
  </Container>
);
