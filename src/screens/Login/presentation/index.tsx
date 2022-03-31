import React from 'react';
import { useCallback } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { Container } from '../../../components/Container';
import { PasswordInput } from '../../../components/PasswordInput';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { ButtonContainer } from '../../../components/ButtonContainer';
import { Form } from '../../../components/Form';
import { VerticalCenter } from '../../../components/VerticalCenter';
import { MarginWhenMobile } from '../../../components/MarginWhenMobile';
import { paths } from '../../../Navigation/paths';
import { Title } from '../../../components/Title';
import { EmailInput } from '../../../components/EmailInput';
import useAxios from 'axios-hooks';
import { loginRequest } from '../../../api';

export const LoginPresentation = () => {
  const [, login] = useAxios(loginRequest, { manual: true });
  const { formatMessage } = useIntl();
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = useCallback(
    async ({ email, password }) => {
      const data = await login({ params: { email, password } });
      console.log(data);
    },
    [login]
  );
  const navigate = useNavigate();
  const onSignUpButtonClick = useCallback(() => {
    navigate(paths.signUp);
  }, [navigate]);
  return (
    <Container>
      <VerticalCenter>
        <MaxWidthContainer>
          <MarginWhenMobile>
            <Box mb={4}>
              <Title>{formatMessage({ id: 'auth.loginTitle' })}</Title>
            </Box>
            <FormProvider {...methods}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Box marginY={2}>
                  <EmailInput />
                </Box>
                <Box marginY={2}>
                  <PasswordInput />
                </Box>
                <ButtonContainer>
                  <Button onClick={onSignUpButtonClick}>
                    {formatMessage({ id: 'auth.dontHaveAccount' })}
                  </Button>
                  <Button variant='contained' type='submit'>
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
};
