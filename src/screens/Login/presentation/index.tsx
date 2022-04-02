import { Button, Box } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { MessageDescriptor } from 'react-intl';

import { ButtonContainer } from '../../../components/ButtonContainer';
import { Container } from '../../../components/Container';
import { EmailInput } from '../../../components/EmailInput';
import { Form } from '../../../components/Form';
import { LoginParamsType } from '../../../api';
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
};

export const LoginPresentation = ({
  formatMessage,
  methods,
  onSubmit,
  onSecondaryClick,
}: LoginPresentationPropType) => (
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
              </Box>
              <ButtonContainer>
                <Button onClick={onSecondaryClick}>
                  {formatMessage({ id: 'auth.dontHaveAccount' })}
                </Button>
                <Button variant="contained" type="submit">
                  {formatMessage({ id: 'auth.login' })}
                </Button>
              </ButtonContainer>
            </Form>
          </FormProvider>
        </MarginWhenMobile>
      </MaxWidthContainer>
    </VerticalCenter>
  </Container>
);
