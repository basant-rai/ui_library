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
    <>
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
          control: (provided, state) => ({
            ...provided,
            backgroundColor: "theme('colors.gray.100')",
            borderColor: state.isFocused ? "theme('colors.gray.400')" : "theme('colors.gray.300')",
            color: "theme('colors.gray.700')",
            padding: "0.5rem",
            fontSize: "0.875rem", // Tailwind text-sm
            boxShadow: state.isFocused ? "0 0 0 2px theme('colors.gray.400')" : "none",
            borderRadius: "0.375rem", // Tailwind rounded-md
            "&:hover": {
              borderColor: "theme('colors.gray.400')",
            },
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            backgroundColor: "theme('colors.white')",
            border: "1px solid theme('colors.gray.200')",
            borderRadius: "0.375rem",
            padding: "0.25rem",
            marginTop: "0.25rem",
            fontSize: "0.875rem",
          }),
          menuList: (provided) => ({
            ...provided,
            padding: 0,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "theme('colors.gray.200')" : "transparent",
            color: "theme('colors.gray.800')",
            padding: "0.5rem",
            borderRadius: "0.375rem",
            "&:hover": {
              backgroundColor: "theme('colors.gray.100')",
            },
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "theme('colors.gray.700')",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "theme('colors.gray.500')",
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
};

export default SingleSelect
