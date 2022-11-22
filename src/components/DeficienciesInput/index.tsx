import { api } from '../../api';
import { SelectInput } from '../SelectInput';

export const DeficienciesInput = (props: { disabled?: boolean }) => {
  const [{ data }] = api.deficiencies.useList();
  const deficiencies = data?.data?.deficiencies || [];
  return (
    <SelectInput
      name="deficiencies"
      multiple
      labelMessage="deficiencies.related"
      rules={{ required: true }}
      options={deficiencies.map(({ name, id }) => ({ label: name, value: id }))}
      {...props}
    />
  );
};
