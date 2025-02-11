/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import Select, { components } from 'react-select';

// 
import { cn } from '../../../utils/cn';
import { IWidth } from '../../../@types/common';


import { SelectStyle } from './style';

// Style
const indicatorsContainerStyles = "gap-1";
const clearIndicatorStyles = "text-black -mr-6 hover:cursor-pointer";
const indicatorSeparatorStyles = "hidden";
const dropdownIndicatorStyles = "";

interface IOption {
  value: string | number | any;
  label: string;
}

interface Props {
  onSelect: (selectedValues: IOption | null) => void;
  placeholder: string,
  width?: IWidth
  options: IOption[],
  label?: string,
  value: string | number
  isSearchable?: boolean
  onCreateNew?: () => void;
  createNew?: boolean
  disabled?: boolean
}

/**
 * 
 */
const SingleSelect = ({
  onSelect,
  placeholder,
  width,
  label,
  value,
  options: initialOptions,
  isSearchable = true,
  onCreateNew,
  createNew = false,
  disabled = false
}: Props) => {
  const [options, setOptions] = useState<IOption[]>(initialOptions);

  useEffect(() => {
    setOptions(initialOptions)
  }, [initialOptions])

  const handleOnSelect = (selectedOption: IOption | null) => {
    onSelect(selectedOption);
  };

  const defaultValue = useMemo(
    () => options.find((o) => String(o.value) === String(value)) || null,
    [options, value]
  );

  // Custom Footer with a Button
  const CustomMenu = (props: any) => {
    return (
      <components.Menu {...props}>
        {props.children}
        {
          createNew &&
          <div className="p-2 border-t border-gray-200 w-full">
            <button
              type="button"
              className="w-full text-start"
              onClick={onCreateNew}
            >
              Create New
            </button>
          </div>
        }
      </components.Menu>
    );
  };

  return (
    <div>
      {
        label &&
        <div className='text-secondary-900 mb-1 font-500 text-sm'>{label}</div>
      }
      <Select
        options={options}
        className={cn(
          width && SelectStyle.width[width]
        )}
        classNamePrefix="react-select"
        menuPlacement="auto"
        onChange={handleOnSelect}
        // onInputChange={handleInputChange}
        menuPortalTarget={document.body}
        placeholder={placeholder || "Select"}
        isClearable={true}
        isSearchable={isSearchable}
        defaultValue={defaultValue}
        value={defaultValue}
        components={{
          Menu: CustomMenu,
        }}
        isDisabled={disabled}
        styles={{
          menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
          control: (provided) => ({
            ...provided,
            backgroundColor: '#F5F5F5',
            borderColor: '#e5e7eb',
            color: 'white',
            padding: '2px 0px',
            fontSize: "14px",
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
            border: "1px solid #F5F5F5",
            borderRadius: "6px",
            overflow: "hidden",
            padding: "4px",
            textTransform: "capitalize",
            marginTop: "2px",
            fontSize: "14px"
          }),
          menuList: (provided) => ({
            ...provided,
            padding: 0,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#F5F5F5' : 'transparent',
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
            color: '#757575',
            textTransform: "capitalize"
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#757575',
          }),
        }}
        classNames={{
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
        }}
      />
    </div>
  );
};

export default SingleSelect
