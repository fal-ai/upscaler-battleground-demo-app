import React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = ({ className, ...props }) => (
  <SwitchPrimitive.Root
    {...props}
    className={cn(
      "w-[42px] h-[25px] dark:bg-neutral-800 bg-neutral-200 rounded-full relative dark:data-[state=checked]:bg-white data-[state=checked]:bg-black outline-none cursor-default",
      className
    )}
    // @ts-expect-error
    style={{ "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)" }}
  >
    <SwitchPrimitive.Thumb className="block w-[21px] h-[21px] bg-white dark:bg-black rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
  </SwitchPrimitive.Root>
);

export default Switch;
