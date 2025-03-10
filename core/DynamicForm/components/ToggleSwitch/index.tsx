import React, { type FC } from "react";
import type { VariantProps } from "class-variance-authority";
import { toggleSwitchVariants } from "../variants/toggle-switch-variants";

// Define the possible color values based on the variants
type ToggleSwitchColor = "default" | "primary" | "info" | "success" | "warning" | "danger" | null;

interface ToggleSwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "color">,
    VariantProps<typeof toggleSwitchVariants> {
  checked?: boolean;
  label?: string;
  sublabel?: string;
  supportText?: any;
  color?: ToggleSwitchColor;  // Use the specific type here
  id?: string;
  formik?: any;
  labelText?: string;
  autoComplete?: string;
  shape?: string;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  id,
  checked,
  label,
  sublabel,
  color,
  className: classes = "",
  supportText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formik,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  labelText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autoComplete,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shape,
  
  ...props
}) => {
  // console.log("checked", checked);
  return (
    <div
      className={`relative col-span-full flex items-center gap-2 text-base ${
        supportText && "justify-between"
      }`}
    >
      <label
        htmlFor={id}
        className="relative inline-flex cursor-pointer items-center gap-3"
      >
        <span className="relative inline-flex">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            className={`peer pointer-events-none absolute opacity-0`}
            {...props}
          />
          <i className={toggleSwitchVariants({ color })}></i>
        </span>

        {!sublabel ? (
          label && (
            <span className="font-sans text-sm text-muted-400">{label}</span>
          )
        ) : (
          <div className="ms-1">
            <span className="block font-sans text-sm text-muted-800 dark:text-muted-100">
              {label}
            </span>
            <span className="block font-sans text-xs text-muted-400 dark:text-muted-400">
              {sublabel}
            </span>
          </div>
        )}
      </label>
      {supportText ? supportText : null}
    </div>
  );
};

export default ToggleSwitch;
