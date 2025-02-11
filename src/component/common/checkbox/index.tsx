import { InputHTMLAttributes } from 'react';

// 
import { cn } from '../../../utils/cn';
import "./checkbox.css";

// 
interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  className?: string;
  label?: string;
  style?: {
    label?: string;
    checkbox?: string;
  };
}

/**
 * 
 * @param param0 
 * @returns 
 */
const Checkbox: React.FC<Props> = ({ className, label, style, onChange, ...rest }) => {
  return (
    <label className={cn(
      className,
      "label-checkbox flex gap-1 items-center text-sm"
    )}>
      <input
        type="checkbox"
        onChange={onChange}
        {...rest}
        className="hidden-checkbox"
      />
      <span className={cn("fake-checkbox", style?.checkbox)}></span>
      {label && (
        <span className={cn("label-text", style?.label)}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
