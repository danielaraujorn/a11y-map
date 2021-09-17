import { useCallback } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { ArrowLeft } from "@mui/icons-material";
import { useForm, FormProvider } from "react-hook-form";
import { Container } from "../../../components/Container";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import { MaxWidthContainer } from "../../../components/MaxWidthContainer";
import { ButtonContainer } from "../../../components/ButtonContainer";
import { Form } from "../../../components/Form";
import { useIntl } from "react-intl";

export const NewPointPresentation = () => {
  const { formatMessage } = useIntl();
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <ArrowLeft />
          </IconButton>
          <Typography component="h1" variant="h6">
            {formatMessage({ id: "newPoint.headerTitle" })}
          </Typography>
        </Toolbar>
      </AppBar>
      <MaxWidthContainer>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Select
              name="type"
              label={formatMessage({ id: "type" })}
              options={[{ value: 1, label: "Visual" }]}
            />
            <Input
              name="description"
              label={formatMessage({ id: "description" })}
              multiline
              minRows={4}
              maxRows={8}
            />
            <Select
              name="status"
              label={formatMessage({ id: "status" })}
              options={[{ value: 1, label: "Pendente" }]}
            />
            <ButtonContainer>
              <Button>{formatMessage({ id: "cancel" })}</Button>
              <Button variant="contained" type="submit">
                {formatMessage({ id: "newPoint.create" })}
              </Button>
            </ButtonContainer>
          </Form>
        </FormProvider>
      </MaxWidthContainer>
    </Container>
  );
};
