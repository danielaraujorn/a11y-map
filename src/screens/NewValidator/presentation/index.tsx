import { Button, Box } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { MessageDescriptor } from 'react-intl';

import { Container } from '../../../components/Container';
import { BackButtonAppBar } from '../../../components/BackButtonAppBar';
import { ButtonContainer } from '../../../components/ButtonContainer';
import { EmailInput } from '../../../components/EmailInput';
import { Form } from '../../../components/Form';
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
};

export const NewValidatorPresentation = ({
  onCancelButtonClick,
  formatMessage,
  methods,
  onSubmit,
  loading,
}: NewValidatorPresentationPropType) => (
  <Container>
    <BackButtonAppBar
      backButtonPath={paths.validators}
      titleMessage={'user.newValidator.headerTitle'}
    />
    <MaxWidthContainer>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box mt={3}>
            <MarginWhenMobile>
              <Box marginY={2}>
                <EmailInput />
              </Box>
              <Box marginY={2}>
                <SelectInput
                  name="role"
                  labelMessage="user.roleType"
                  rules={{ required: true }}
                  options={[
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
                <Button disabled={loading} onClick={onCancelButtonClick}>
                  {formatMessage({ id: 'cancel' })}
                </Button>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                >
                  {formatMessage({
                    id: 'save',
                  })}
                </LoadingButton>
              </ButtonContainer>
            </MarginWhenMobile>
          </Box>
        </Form>
      </FormProvider>
    </MaxWidthContainer>
  </Container>
);
