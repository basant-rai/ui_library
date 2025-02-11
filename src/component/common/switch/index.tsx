
// 
import { cn } from '../../../utils/cn';
import "./switch.css";

interface Props {
  label?: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
  className?: string;
  style?: {
    checkbox?: string;
    label?: string;
  };
}


/**
 * 
 */
const ToggleSwitch: React.FC<Props> = (Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const { className, label, style, onChange, checked } = Props;

  return (
    <label className={cn(className, "inline-flex gap-1 items-center text-sm hover:cursor-pointer")}>
      <div className='toggle-switch'>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className={
          cn(
            "fake-toggle-input",
            style?.checkbox)}
        />
      </div>
      {label && (
        <span className={cn("", style?.label)}>
          {label}
        </span>
      )}
    </label>

  );
};

export default ToggleSwitch;