import { Button, Box } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { MessageDescriptor } from 'react-intl';

import { Container } from '../../../components/Container';
import { ButtonContainer } from '../../../components/ButtonContainer';
import { EmailInput } from '../../../components/EmailInput';
import { Form } from '../../../components/Form';
import { Header } from '../../../components/Header';
import { MarginWhenMobile } from '../../../components/MarginWhenMobile';
import { MaxWidthContainer } from '../../../components/MaxWidthContainer';
import { NewValidatorParamsType } from '../../../types/Forms';
import { RoleEnum } from '../../../types/Models';
import { SelectInput } from '../../../components/SelectInput';
import { paths } from '../../../Navigation/paths';

type NewValidatorPresentationPropType = {
  formatMessage: (descriptor: MessageDescriptor) => string;
  methods: UseFormReturn<NewValidatorParamsType>;
  onSubmit: (params: NewValidatorParamsType) => void;
  onCancelButtonClick: () => void;
  loading?: boolean;
  update?: boolean;
};

export const NewValidatorPresentation = ({
  onCancelButtonClick,
  formatMessage,
  methods,
  onSubmit,
  loading,
  update,
}: NewValidatorPresentationPropType) => {
  const cancelButtonTitle = formatMessage({
    id: 'cancel',
  });
  const saveButtonTitle = formatMessage({
    id: 'save',
  });

  return (
    <Container>
      <Header
        backButtonPath={paths.validators}
        titleMessage={
          update ? 'user.role.validator' : 'user.newValidator.headerTitle'
        }
      />
      <MaxWidthContainer>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box mt={3}>
              <MarginWhenMobile>
                <Box marginY={2}>
                  <EmailInput disabled={update} />
                </Box>
                <Box marginY={2}>
                  <SelectInput
                    name="role"
                    labelMessage="user.roleType"
                    rules={{ required: true }}
                    options={[
                      ...(update
                        ? [
                            {
                              value: RoleEnum.NORMAL,
                              label: formatMessage({ id: 'user.role.normal' }),
                            },
                          ]
                        : []),
                      {
                        value: RoleEnum.VALIDATOR,
                        label: formatMessage({ id: 'user.role.validator' }),
                      },
                      {
                        value: RoleEnum.ADMIN,
                        label: formatMessage({ id: 'user.role.admin' }),
                      },
                    ]}
                  />
                </Box>
                <ButtonContainer>
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
