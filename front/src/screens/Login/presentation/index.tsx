import { useCallback } from "react";
import { Button, Box } from "@mui/material";
import { useHistory } from "react-router";
import { useIntl } from "react-intl";
import { useForm, FormProvider } from "react-hook-form";
import { Container } from "../../../components/Container";
import { Input } from "../../../components/Input";
import { PasswordInput } from "../../../components/PasswordInput";
import { MaxWidthContainer } from "../../../components/MaxWidthContainer";
import { ButtonContainer } from "../../../components/ButtonContainer";
import { Form } from "../../../components/Form";
import { VerticalCenter } from "../../../components/VerticalCenter";
import { MarginWhenMobile } from "../../../components/MarginWhenMobile";
import { paths } from "../../../Navigation/paths";

export const LoginPresentation = () => {
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
  const onSignUpButtonClick = useCallback(() => {
    history.push(paths.signUp);
  }, [history]);
  return (
    <Container>
      <VerticalCenter>
        <MaxWidthContainer>
          <MarginWhenMobile>
            <FormProvider {...methods}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Box marginY={2}>
                  <Input
                    rules={{ required: true }}
                    name="email"
                    labelMessage="email"
                  />
                </Box>
                <Box marginY={2}>
                  <PasswordInput />
                </Box>
                <ButtonContainer>
                  <Button onClick={onSignUpButtonClick}>
                    {formatMessage({ id: "auth.dontHaveAccount" })}
                  </Button>
                  <Button variant="contained" type="submit">
                    {formatMessage({ id: "auth.login" })}
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
