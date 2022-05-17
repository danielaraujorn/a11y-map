import { Button, Box } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { MessageDescriptor } from 'react-intl';

import { ButtonContainer } from '../../../components/ButtonContainer';
import { Container } from '../../../components/Container';
import { EmailInput } from '../../../components/EmailInput';
import { Form } from '../../../components/Form';
import { ForgotPasswordParamsType } from '../../../types/Forms';
import { MarginWhenMobile } from '../../../components/MarginWhenMobile';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { Title } from '../../../components/Title';
import { VerticalCenter } from '../../../components/VerticalCenter';

type ForgotPasswordPresentationPropType = {
  formatMessage: (descriptor: MessageDescriptor) => string;
  methods: UseFormReturn<ForgotPasswordParamsType>;
  onSubmit: (params: ForgotPasswordParamsType) => void;
  onSecondaryClick: () => void;
  loading?: boolean;
};

export const ForgotPasswordPresentation = ({
  loading,
  formatMessage,
  methods,
  onSubmit,
  onSecondaryClick,
}: ForgotPasswordPresentationPropType) => {
  const goBackButtonTitle = formatMessage({ id: 'goBack' });
  const recoverPasswordButtonTitle = formatMessage({
    id: 'auth.recoverPassword',
  });

  return (
    <Container>
      <VerticalCenter>
        <MaxWidthContainer>
          <MarginWhenMobile>
            <Box mb={4}>
              <Title>{formatMessage({ id: 'auth.forgotPassword' })}</Title>
            </Box>
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box marginY={2}>
                  <EmailInput />
                </Box>
                <ButtonContainer>
                  <Button
                    aria-label={goBackButtonTitle}
                    disabled={loading}
                    onClick={onSecondaryClick}
                  >
                    {goBackButtonTitle}
                  </Button>
                  <LoadingButton
                    aria-label={recoverPasswordButtonTitle}
                    loading={loading}
                    variant="contained"
                    type="submit"
                  >
                    {recoverPasswordButtonTitle}
                  </LoadingButton>
                </ButtonContainer>
              </Form>
            </FormProvider>
          </MarginWhenMobile>
        </MaxWidthContainer>
      </VerticalCenter>
    </Container>
  );
};
