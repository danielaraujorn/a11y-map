import { Button, Box } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { MessageDescriptor } from 'react-intl';

import { ButtonContainer } from '../../../components/ButtonContainer';
import { Container } from '../../../components/Container';
import { EmailInput } from '../../../components/EmailInput';
import { Form } from '../../../components/Form';
import { LoginParamsType } from '../../../types/Forms';
import { MarginWhenMobile } from '../../../components/MarginWhenMobile';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { PasswordInput } from '../../../components/PasswordInput';
import { Title } from '../../../components/Title';
import { VerticalCenter } from '../../../components/VerticalCenter';

type LoginPresentationPropType = {
  formatMessage: (descriptor: MessageDescriptor) => string;
  methods: UseFormReturn<LoginParamsType>;
  onSubmit: (params: LoginParamsType) => void;
  onSecondaryClick: () => void;
  forgotPassword: () => void;
  loading?: boolean;
};

export const LoginPresentation = ({
  loading,
  formatMessage,
  methods,
  onSubmit,
  onSecondaryClick,
  forgotPassword,
}: LoginPresentationPropType) => {
  const forgotPasswordButtonTitle = formatMessage({
    id: 'auth.forgotPassword',
  });
  const signUpButtonTitle = formatMessage({
    id: 'auth.dontHaveAccount',
  });
  const loginButtonTitle = formatMessage({
    id: 'auth.login',
  });

  return (
    <Container>
      <VerticalCenter>
        <MaxWidthContainer>
          <MarginWhenMobile>
            <Box mb={4}>
              <Title>{formatMessage({ id: 'auth.loginTitle' })}</Title>
            </Box>
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box marginY={2}>
                  <EmailInput />
                </Box>
                <Box marginY={2}>
                  <PasswordInput />
                  <Box marginTop={1}>
                    <Button
                      aria-label={forgotPasswordButtonTitle}
                      disabled={loading}
                      onClick={forgotPassword}
                      size="small"
                    >
                      {forgotPasswordButtonTitle}
                    </Button>
                  </Box>
                </Box>
                <ButtonContainer>
                  <Button
                    aria-label={signUpButtonTitle}
                    disabled={loading}
                    onClick={onSecondaryClick}
                  >
                    {signUpButtonTitle}
                  </Button>
                  <LoadingButton
                    aria-label={loginButtonTitle}
                    loading={loading}
                    variant="contained"
                    type="submit"
                  >
                    {loginButtonTitle}
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
