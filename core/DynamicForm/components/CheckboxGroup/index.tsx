import React from "react";
import Checkbox from "../Checkbox";
import FormError from "../../FormError";

interface CheckboxGroupProps {
  label?: string;
  name: string;
  options: { label?: string; value: any; index?: number; disabled?: boolean }[];
  formik: any;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  options,
  formik,
}) => {
  const handleChange = (value: { label?: string; value: any }) => {
    const selectedValues = formik.values[name] || [];
    const valueToCheck = value.value; // using value directly

    const isSelected = selectedValues.includes(valueToCheck);

    if (isSelected) {
      // Remove the value if it is already selected
      formik.setFieldValue(
        name,
        selectedValues.filter((item: any) => item !== valueToCheck)
      );
    } else {
      // Add the value if it is not selected
      formik.setFieldValue(name, [...selectedValues, valueToCheck]);
    }
  };

  return (
    <div
      role="group"
      aria-labelledby="checkbox-group"
      className="col-span-full w-full font-sans"
    >
      {label && (
        <label className="font-sans text-[.85rem] text-muted-400">
          {label}
        </label>
      )}
      <div className="mt-2 grid grid-cols-4 gap-4">
        {options?.map((option) => (
          <Checkbox
            key={option.value} // key is for React to track the list items
            label={option.label || ""}
            value={option.value}
            checked={formik.values[name]?.includes(option.value) || false} // Simplified checked logic
            onChange={() => handleChange(option)} // Passing the entire option
            onBlur={formik.handleBlur}
            disabled={option.disabled} // If option is disabled, pass it to Checkbox component
          />
        ))}
      </div>
      {/* Render error message if exists */}
      {formik.touched[name] && formik.errors[name] && (
        <FormError name={name} formik={formik} helperText={formik.errors[name]} />
      )}
    </div>
  );
};

export default CheckboxGroup;
