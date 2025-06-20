import { type ComponentProps, useId } from "react";

import { Input } from "@/components/ui/input";

export function AnimatedInput({
  id,
  placeholder,
  name,
  ...props
}: ComponentProps<typeof Input>) {
  const elId = id || useId();
  return (
    <div className="group relative">
      <label
        htmlFor={elId}
        className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
      >
        <span className="bg-background inline-flex px-2">
          {placeholder || name || " "}
        </span>
      </label>
      <Input id={elId} placeholder=" " {...props} />
    </div>
  );
}
