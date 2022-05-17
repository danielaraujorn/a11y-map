import { Button, Box } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { MessageDescriptor } from 'react-intl';

import { ButtonContainer } from '../../../components/ButtonContainer';
import { Container } from '../../../components/Container';
import { EmailInput } from '../../../components/EmailInput';
import { Form } from '../../../components/Form';
// import { Input } from "../../../components/Input";
import { MarginWhenMobile } from '../../../components/MarginWhenMobile';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import {
  PasswordInput,
  PasswordConfirmationInput,
} from '../../../components/PasswordInput';
import { SignUpParamsType } from '../../../types/Forms';
import { Title } from '../../../components/Title';
import { VerticalCenter } from '../../../components/VerticalCenter';

type SignUpPresentationPropType = {
  formatMessage: (descriptor: MessageDescriptor) => string;
  methods: UseFormReturn<SignUpParamsType>;
  onSubmit: (params: SignUpParamsType) => void;
  onSecondaryClick: () => void;
  loading?: boolean;
};

export const SignUpPresentation = ({
  loading,
  formatMessage,
  methods,
  onSubmit,
  onSecondaryClick,
}: SignUpPresentationPropType) => {
  const loginButtonTitle = formatMessage({
    id: 'auth.alreadyHaveAccount',
  });
  const signUpButtonTitle = formatMessage({
    id: 'auth.signUp',
  });

  return (
    <Container>
      <VerticalCenter>
        <MaxWidthContainer>
          <MarginWhenMobile>
            <Box mb={4}>
              <Title>{formatMessage({ id: 'auth.signUpTitle' })}</Title>
            </Box>
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                {/* <Box marginY={2}>
                  <Input
                    rules={{ required: true }}
                    name="firstName"
                    labelMessage="firstName"
                  />
                </Box>
                <Box marginY={2}>
                  <Input
                    rules={{ required: true }}
                    name="lastName"
                    labelMessage="lastName"
                  />
                </Box> */}
                <Box marginY={2}>
                  <EmailInput />
                </Box>
                <Box marginY={2}>
                  <PasswordInput />
                </Box>
                <Box marginY={2}>
                  <PasswordConfirmationInput />
                </Box>
                <ButtonContainer>
                  <Button
                    aria-label={loginButtonTitle}
                    disabled={loading}
                    onClick={onSecondaryClick}
                  >
                    {loginButtonTitle}
                  </Button>
                  <LoadingButton
                    aria-label={signUpButtonTitle}
                    loading={loading}
                    variant="contained"
                    type="submit"
                  >
                    {signUpButtonTitle}
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
