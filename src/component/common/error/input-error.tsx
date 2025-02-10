import { cn } from "@/utils/cn"

interface Props {
  error: string
}
/**
 * 
 * @param param0 
 * @returns 
 */
const InputError = ({
  error
}: Props) => {
  return (
    <div className={cn("text-destructive text-xs mt-1")}>
      {error}
    </div>
  )
}

export default InputError