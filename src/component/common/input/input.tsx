import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

/**
 * Custom Input Component
 */
const Input = ({
  placeholder,
  ...props
}: InputProps) => {


  return (
    <input
      {...props}
      placeholder={placeholder || "Enter something..."}
      className={cn(
        "appearance-none block w-full px-2.5 py-3 border rounded-md bg-light placeholder:text-gray-400 focus:outline-none disabled:text-gray-500 disabled:bg-secondary-200/10 text-sm",
      )}
    />
  );
};

export default Input;
