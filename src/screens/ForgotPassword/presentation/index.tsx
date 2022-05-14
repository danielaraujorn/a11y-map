import { Button, Box } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
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
};

export const ForgotPasswordPresentation = ({
  formatMessage,
  methods,
  onSubmit,
  onSecondaryClick,
}: ForgotPasswordPresentationPropType) => (
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
                <Button onClick={onSecondaryClick}>
                  {formatMessage({ id: 'goBack' })}
                </Button>
                <Button variant="contained" type="submit">
                  {formatMessage({ id: 'auth.recoverPassword' })}
                </Button>
              </ButtonContainer>
            </Form>
          </FormProvider>
        </MarginWhenMobile>
      </MaxWidthContainer>
    </VerticalCenter>
  </Container>
);
