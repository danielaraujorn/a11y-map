import { Button, Box } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { MessageDescriptor } from 'react-intl';

import { Container } from '../../../components/Container';
import { ButtonContainer } from '../../../components/ButtonContainer';
import { Form } from '../../../components/Form';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { MarginWhenMobile } from '../../../components/MarginWhenMobile';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { NewDeficiencyParamsType } from '../../../types/Forms';
import { paths } from '../../../Navigation/paths';

type NewDeficiencyPresentationPropType = {
  formatMessage: (descriptor: MessageDescriptor) => string;
  methods: UseFormReturn<NewDeficiencyParamsType>;
  onSubmit: (params: NewDeficiencyParamsType) => void;
  onCancelButtonClick: () => void;
  onDeleteButtonClick: () => void;
  loading?: boolean;
  update?: boolean;
};

export const NewDeficiencyPresentation = ({
  onCancelButtonClick,
  onDeleteButtonClick,
  formatMessage,
  methods,
  onSubmit,
  loading,
  update,
}: NewDeficiencyPresentationPropType) => {
  const cancelButtonTitle = formatMessage({
    id: 'cancel',
  });
  const saveButtonTitle = formatMessage({
    id: update ? 'save' : 'create',
  });
  const deleteButtonTitle = formatMessage({
    id: 'delete',
  });

  return (
    <Container>
      <Header
        backButtonPath={paths.validators}
        titleMessage={update ? 'deficiency' : 'deficiencies.new.headerTitle'}
      />
      <MaxWidthContainer>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box mt={3}>
              <MarginWhenMobile>
                <Box marginY={2}>
                  <Input
                    name="name"
                    labelMessage="name"
                    rules={{ required: true }}
                  />
                </Box>
                <Box marginY={2}>
                  <Input
                    name="description"
                    labelMessage="description"
                    rules={{ required: true }}
                    multiline
                    minRows={4}
                    maxRows={8}
                  />
                </Box>
                <ButtonContainer>
                  {update && (
                    <Button
                      sx={{ mr: 'auto' }}
                      color="warning"
                      aria-label={deleteButtonTitle}
                      disabled={loading}
                      onClick={onDeleteButtonClick}
                    >
                      {deleteButtonTitle}
                    </Button>
                  )}
                  <Button
                    aria-label={cancelButtonTitle}
                    disabled={loading}
                    onClick={onCancelButtonClick}
                  >
                    {cancelButtonTitle}
                  </Button>
                  <LoadingButton
                    aria-label={saveButtonTitle}
                    loading={loading}
                    variant="contained"
                    type="submit"
                  >
                    {saveButtonTitle}
                  </LoadingButton>
                </ButtonContainer>
              </MarginWhenMobile>
            </Box>
          </Form>
        </FormProvider>
      </MaxWidthContainer>
    </Container>
  );
};
