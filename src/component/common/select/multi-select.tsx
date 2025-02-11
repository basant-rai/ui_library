/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { components } from 'react-select';
import { useMemo } from 'react';

// 
import { IWidth } from '../../../@types/common';

// 
import Checkbox from '../checkbox';

// 
import { cn } from '../../../utils/cn';
import { SelectStyle } from './style';

interface IOption {
  value: string | number | any;
  label: string;
}

// type
interface Props {
  placeholder?: string,
  onSelect: (selectedValues: IOption[] | null) => void;
  options: IOption[]
  width: IWidth
  isSearchable?: boolean
  value?: string[]
  label?: string
}

// Style
const indicatorsContainerStyles = "gap-1";
const clearIndicatorStyles = "text-black -mr-6 hover:cursor-pointer";
const indicatorSeparatorStyles = "hidden";
const dropdownIndicatorStyles = "";

// 
const CheckboxOption = (props: any) => (
  <components.Option {...props} className=''>
    <div className='flex items-center gap-2'>
      <Checkbox
        checked={props.isSelected}
        onChange={(e) => props.onChange(e)}
      />
      {props.label}
    </div>
  </components.Option>
);

// 
const MultiValue = ({ index, getValue }: { index: number, getValue: any }) => {
  const selectedOptions = getValue();
  const length = selectedOptions.length;

  return index === 0 ? (
    <div className="">
      {length > 0 ? (
        <div className="text-secondary-200">
          {length} item{length > 1 ? 's' : ''}
        </div>
      ) : (
        <div className="text-secondary-200">{"Select an option"}</div>
      )}
    </div>
  ) : null;
};

/**
 * 
 */
export default function MultiSelect({
  width = "lg",
  placeholder,
  onSelect,
  options,
  isSearchable = false,
  value,
  label
}: Props) {

  const handleOnSelect = (selectedOption: any) => {
    onSelect(selectedOption);
  };

  const defaultValue = useMemo(
    () => options.filter((o) => value?.includes(o.value)),
    [options, value]
  );
  return (
    <>
      {
        label &&
        <div className='text-secondary-900 mb-1 font-500 text-sm'>{label}</div>
      }
      <Select
        options={options}
        isMulti
        defaultValue={defaultValue}
        onChange={handleOnSelect}
        className={cn(
          width && SelectStyle.width[width]
        )}
        isSearchable={isSearchable}
        components={{
          MultiValue: MultiValue,
          Option: CheckboxOption,
        }}
        classNamePrefix="react-select"
        placeholder={placeholder || "Select"}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        menuPlacement="auto"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
          control: (provided) => ({
            ...provided,
            backgroundColor: '#F5F5F5',
            borderColor: '#e5e7eb',
            color: 'white',
            padding: '2px 0px',
            boxShadow: "none",
            borderRadius: "6px",
            '&:focus': {
              outline: "none"
            },
            '&:hover': {
              borderColor: "#D5D5D5",
              outline: "none"
            },
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            backgroundColor: 'white',
            border: "1px solid #e5e7eb",
            padding: '4px 0px',
            overflow: "hidden",
            marginTop: "2px"
          }),
          menuList: (provided) => ({
            ...provided,
            padding: 0,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'transparent' : 'transparent',
            color: state.isSelected ? 'black' : 'black',
            marginBottom: "4px",
            borderRadius: "6px",
            '&:hover': {
              backgroundColor: "#F5F5F5",
              color: 'black',
            },
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#757575'
          }),
          placeholder: (provided) => ({
            ...provided,
            color: 'black',
          }),
        }}
        classNames={{
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
        }}
      />
    </>

  );
}