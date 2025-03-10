import React, { useState } from "react";
import { GoCheck } from "react-icons/go";
import { replaceUnderscoresWithSpaces } from "../../utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: "primary" | "info" | "success" | "warning" | "danger" | "default";
  shape?: "rounded" | "smooth" | "curved" | "full";
  supportText?: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  [key: string]: any;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  color = "primary",
  shape = "smooth",
  label,
  supportText,
  disabled,
  checked: controlledChecked,
  defaultChecked,
  onChange,
  ...props
}) => {
  // Handle both controlled and uncontrolled components
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked || false
  );
  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (controlledChecked === undefined) {
      setInternalChecked(e.target.checked);
    }
    if (onChange) {
      onChange(e);
    }
  };

  // Define background colors based on the color prop
  const bgColor = {
    primary: "bg-blue-500",
    info: "bg-cyan-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    default: "bg-gray-500",
  }[color];

  // Define border radius based on the shape prop
  const borderRadius = {
    rounded: "rounded",
    smooth: "rounded-md",
    curved: "rounded-lg",
    full: "rounded-full",
  }[shape];

  return (
    <div className="flex items-start space-x-2">
      <div className="relative flex items-center">
        {/* Hidden real checkbox */}
        <input
          id={id}
          type="checkbox"
          className="absolute h-5 w-5 opacity-0"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />

        {/* Custom checkbox */}
        <div
          className={`h-5 w-5 flex items-center justify-center border-2 border-gray-300 ${borderRadius} ${
            disabled ? "opacity-50" : ""
          }`}
        >
          <div
            className={`h-4 w-4 flex items-center justify-center ${bgColor} ${borderRadius} transform ${
              isChecked ? "scale-100" : "scale-0"
            } transition-transform duration-200`}
          >
            <GoCheck className="text-white text-sm" />
          </div>
        </div>
      </div>

      {label && (
        <label htmlFor={id} className="cursor-pointer text-sm text-gray-600">
          {typeof label === "object"
            ? label
            : replaceUnderscoresWithSpaces(label)}
        </label>
      )}

      {supportText && (
        <div className="text-sm text-gray-500">{supportText}</div>
      )}
    </div>
  );
};

export default Checkbox;
