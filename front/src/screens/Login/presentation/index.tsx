import { useCallback } from "react";
import { Button, Box } from "@mui/material";
import { useIntl } from "react-intl";
import { useForm, FormProvider } from "react-hook-form";
import { Container } from "../../../components/Container";
import { Input } from "../../../components/Input";
import { PasswordInput } from "../../../components/PasswordInput";
import { MaxWidthContainer } from "../../../components/MaxWidthContainer";
import { ButtonContainer } from "../../../components/ButtonContainer";
import { Form } from "../../../components/Form";
import { VerticalCenter } from "../../../components/VerticalCenter";

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
  return (
    <Container>
      <VerticalCenter>
        <MaxWidthContainer>
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Box m={2} mt={3}>
                <Box marginY={2}>
                  <Input
                    rules={{ required: true }}
                    name="email"
                    label={formatMessage({ id: "email" })}
                  />
                </Box>
                <Box marginY={2}>
                  <PasswordInput
                    rules={{ required: true }}
                    name="password"
                    label={formatMessage({ id: "password" })}
                  />
                </Box>
                <ButtonContainer>
                  <Button>{formatMessage({ id: "auth.newAcount" })}</Button>
                  <Button variant="contained" type="submit">
                    {formatMessage({ id: "auth.login" })}
                  </Button>
                </ButtonContainer>
              </Box>
            </Form>
          </FormProvider>
        </MaxWidthContainer>
      </VerticalCenter>
    </Container>
  );
};
