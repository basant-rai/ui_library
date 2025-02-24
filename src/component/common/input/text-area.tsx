import { cn } from '../../../utils/cn';

interface Props extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  rows?: number
  placeholder?: string
  className?: string
}


/**
 * 
 */
const InputTextArea = ({
  rows = 5,
  placeholder = "Enter here...",
  className
}: Props) => {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      className={cn(
        "appearance-none block w-full px-2.5 py-3 border rounded-md bg-light placeholder:text-gray-400 focus:outline-none disabled:text-gray-500 disabled:bg-secondary-200/10 text-sm",
        className
      )}
    />
  )
}

export default InputTextArea