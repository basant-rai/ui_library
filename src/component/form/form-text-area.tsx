// 
import { cn } from '../../utils/cn';

// 
import Required from '../../component/common/required';
import InputError from '../../component/common/error/input-error';
import InputTextArea from '../../component/common/input/text-area';


// 
interface Props extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  label?: string;
  error?: string;
  style?: {
    className?: string;
    input?: string;
  };
  rows?: number
  required?: boolean
}

/**
 * 
 * @returns 
 */
const FormTextAreaInput = ({
  label,
  error,
  style,
  required = false,
  ...props
}: Props) => {
  return (
    <label htmlFor={props.name} className={cn(
      "block text-sm",
      style?.className
    )}>
      {label &&
        <div >
          {label} {required && <Required />}
        </div>
      }
      <InputTextArea
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

export default FormTextAreaInput