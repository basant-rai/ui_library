import { cn } from "../../../utils/cn";
import LoaderIcon from "../../../assets/icon/loader"

// 
type ButtonColors = "primary" | "secondary" | "outline" | "default";
type ButtonBorder = "full" | "md" | "lg" | "none";
type ButtonSize = "sm" | "md" | "lg";

// 
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColors;
  size?: ButtonSize;
  rounded?: ButtonBorder;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string
}

// 
const buttonStyles = {
  color: {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    outline: "border border-border text-black",
    default: "bg-white text-black",
  },
  size: {
    sm: "px-3 py-1",
    md: "px-4 py-2",
    lg: "px-5 py-3",
  },
  rounded: {
    full: "rounded-full",
    lg: "rounded-lg",
    md: "rounded-md",
    none: ""

  },
  loading: "cursor-not-allowed opacity-50",
  disabled: "cursor-not-allowed opacity-50",
};

//
export default function Button({
  color,
  size = "md",
  rounded = "md",
  children,
  startIcon,
  endIcon,
  className,
  isLoading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "cursor-pointer flex items-center justify-center gap-2 font-500 text-sm",
        buttonStyles.color[color],
        buttonStyles.size[size],
        buttonStyles.rounded[rounded],
        isLoading || disabled ? buttonStyles.loading : "",
        disabled ? buttonStyles.disabled : "",
        className
      )}
      disabled={isLoading || disabled}
    >
      {
        isLoading ?
          <LoaderIcon /> :
          <>
            {startIcon && <span>{startIcon}</span>}
            {children}
            {endIcon && <span>{endIcon}</span>}
          </>
      }
    </button>
  );
}
