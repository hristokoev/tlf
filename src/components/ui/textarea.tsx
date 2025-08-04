import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<
  {
    ref?: React.Ref<HTMLTextAreaElement>
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ref, ...props }) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded bg-background px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none', // Added resize-none
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Textarea }
