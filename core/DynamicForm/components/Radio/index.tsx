import React, { type FC } from "react";
import type { VariantProps } from "class-variance-authority";
import { radioVariants } from "../variants/radio-variants";

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "color">,
    VariantProps<typeof radioVariants> {
  label: string;
}

const Radio: FC<RadioProps> = ({
  id,
  color = "gray",
  label,
  className: classes = "",
  ...props
}) => {
  return (
    <div className="relative inline-block cursor-pointer leading-tight">
      <label htmlFor={id} className="flex items-center">
        <div className="relative">
          {/* Hidden input */}
          <input
            id={id}
            type="radio"
            className={`absolute opacity-0 w-5 h-5 z-10 cursor-pointer ${classes}`}
            {...props}
          />
          
          {/* Visible radio circle */}
          <div className="w-5 h-5 rounded-full border border-muted-300 bg-muted-100 dark:border-muted-700 dark:bg-muted-800 flex items-center justify-center">
            {/* Inner circle that appears when checked */}
            <div className={`w-2.5 h-2.5 rounded-full scale-0 transition-transform duration-200 ${props.checked ? "scale-100" : ""} ${color ? `bg-${color}-500` : "bg-green-500"}`}></div>
          </div>
        </div>
        
        {/* Label */}
        <span className="ml-2 text-[.9rem] text-muted-400">
          {label}
        </span>
      </label>
    </div>
  );
};

export default Radio;