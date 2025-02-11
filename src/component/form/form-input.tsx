import React from 'react'

// 
import { cn } from '../../utils/cn';

// 
import Required from '../../component/common/required';
import Input from '../../component/common/input/input';
import InputError from '../../component/common/error/input-error';


// 
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  error?: string;
  style?: {
    className?: string;
    input?: string;
  };
  required?: boolean
}

/**
 * 
 * @returns 
 */
const FormInput = ({
  label,
  error,
  style,
  required = false,
  ...props
}: Props) => {
  return (
    <label
      htmlFor={props.name}
      className={cn(
        "inline-block w-full text-sm",
        style?.className
      )}>
      {label &&
        <div >
          {label} {required && <Required />}
        </div>
      }
      <Input
        {...props}
        className={cn(
          error && `border-destructive`,
          style?.input
        )}
      />
      {
        error &&
        <InputError error={error} />
      }
    </label>
  )
}

export default FormInput