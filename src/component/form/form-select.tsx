
// 
import { IOption } from '../../@types/common';
import InputError from '../common/error/input-error';
import CustomSelect from '../common/select/single-select';

// 
interface Props {
  items: IOption[];
  name: any;
  value: string
  label?: string
  error?: string
  placeholder?: string
  onCreateNew?: () => void
  createNew?: boolean
  onSelect: (value: IOption | null) => void
}

/**
 * 
 * @param param0 
 * @returns 
 */
const FormSelect = ({
  items,
  name,
  label,
  error,
  placeholder,
  onCreateNew,
  onSelect,
  createNew,
  value,
  ...field
}: Props) => {
  return (
    <div>
      <CustomSelect
        {...field}
        onSelect={onSelect}
        placeholder={placeholder || "Select"}
        options={items}
        value={value}
        onCreateNew={onCreateNew}
        createNew={createNew}
      />
      {error && (
        <InputError error={error} />
      )}
    </div>
  );
};

export default FormSelect;
