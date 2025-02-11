import { InputHTMLAttributes } from 'react';

// 
import { cn } from '../../../utils/cn';
import "./radio.css";

// 
interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "style"> {
  className?: string;
  label?: string;
  style?: {
    label?: string;
    radio?: string;
  };
}

/**
 * 
 */
const Radio: React.FC<Props> = (Props) => {
  const { className, label, style, onChange, ...rest } = Props;

  return (
    <label className={cn(className, "label-radio flex gap-1 items-center text-sm ")}>
      <input
        type="radio"
        onChange={onChange}
        {...rest}
      />
      <span className={cn("fake-radio", style?.radio)}></span>
      {label && (
        <span className={cn("", style?.label)}>
          {label}
        </span>
      )}
    </label>

  );
};

export default Radio;