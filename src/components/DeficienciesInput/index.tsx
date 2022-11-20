import { api } from '../../api';
import { SelectInput } from '../SelectInput';

export const DeficienciesInput = () => {
  const [{ data }] = api.deficiencies.useList();
  const deficiencies = data?.data?.deficiencies || [];
  return (
    <SelectInput
      name="deficiencies"
      multiple
      labelMessage="deficiencies"
      rules={{ required: true }}
      options={deficiencies.map(({ name, id }) => ({ label: name, value: id }))}
    />
  );
};
