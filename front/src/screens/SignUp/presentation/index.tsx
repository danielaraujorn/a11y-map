import { useCallback } from "react";
import { Button, Box } from "@mui/material";
import { useHistory } from "react-router";
import { useIntl } from "react-intl";
import { useForm, FormProvider } from "react-hook-form";
import { Container } from "../../../components/Container";
import { Input } from "../../../components/Input";
import {
  PasswordInput,
  PasswordConfirmationInput
} from "../../../components/PasswordInput";
import { MaxWidthContainer } from "../../../components/MaxWidthContainer";
import { ButtonContainer } from "../../../components/ButtonContainer";
import { Form } from "../../../components/Form";
import { VerticalCenter } from "../../../components/VerticalCenter";
import { MarginWhenMobile } from "../../../components/MarginWhenMobile";
import { paths } from "../../../Navigation/paths";
import { Title } from "../../../components/Title";
import { EmailInput } from "../../../components/EmailInput";

export const SignUpPresentation = () => {
  const { formatMessage } = useIntl();
  const methods = useForm({
    defaultValues: {
      types: [],
      description: "",
      status: 1
    }
  });
  const { handleSubmit } = methods;
  const onSubmit = useCallback((formData) => {
    const data = { ...formData };
    console.log(data);
  }, []);
  const history = useHistory();
  const onLoginButtonClick = useCallback(() => {
    history.push(paths.login);
  }, [history]);
  return (
    <Container>
      <VerticalCenter>
        <MaxWidthContainer>
          <MarginWhenMobile>
            <Box mb={4}>
              <Title>{formatMessage({ id: "auth.signUpTitle" })}</Title>
            </Box>
            <FormProvider {...methods}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Box marginY={2}>
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
                </Box>
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
                  <Button onClick={onLoginButtonClick}>
                    {formatMessage({ id: "auth.alreadyHaveAccount" })}
                  </Button>
                  <Button variant="contained" type="submit">
                    {formatMessage({ id: "auth.signUp" })}
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
