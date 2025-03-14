"use client";
import { getIn, useFormik } from "formik";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Yup from "yup";
import { checkDependency } from "./utils/checkDependency";
import { filterSubmittingValues } from "./utils/filterSubmittingValues";
import { generateInitialValues } from "./utils/generateInitialValues";
import { generateValidationSchema } from "./utils/generateValidationSchema";
import { storeOrSendValueToApi } from "./utils/storeOrSendValueToApi";
import { cn } from "./utils/cn";
import Input from "./components/Input";
import Password from "./components/Password";
import Number from "./components/Number";
import { BiTrash } from "react-icons/bi";
import Textarea from "./components/TextArea";
import Select from "./components/Select";
import File from "./components/File";
import FormError from "./FormError";
import ToggleSwitch from "./components/ToggleSwitch";
import Checkbox from "./components/Checkbox";
import ComboSelect from "./components/Select/ComboSelect";

import CheckboxGroup from "./components/CheckboxGroup";
import SignaturePanel from "./components/SignaturePanel";
import RadioGroup from "./components/RadioGroup";

interface ValidationRule {
  type: string;
  message?: string;
  value?: any;
  regex?: RegExp;
}

interface Validation {
  type: string;
  validations: ValidationRule[];
}

interface Widths {
  default: string;
  greaterThan1440: string;
  between890And1440: string;
  between600And890: string;
}

interface Dependency {
  condition: string;
  rules: { name: string; operator: string; value: any }[];
}

export interface Item {
  index: number;
  widths: Widths;
  name: string;
  label: string;
  required?: boolean;
  tag?: string;
  options?: string[];
  placeholder?: string;
  type?: string;
  validation?: Validation;
  depends?: Dependency;
  dependsDisabled?: Dependency;
  dependsEnabled?: Dependency;
  form?: NestedForm;
  variant?: string;
  multiple?: boolean;
  requiredEnabled?: Dependency;
  requiredDisabled?: Dependency;
  hidden?: boolean;
  calculate?: { operator: string; fields: string[] };
  disabled?: boolean;
}

interface NestedForm {
  name: string;
  grid: number;
  items: Item[];
}

type Submit = {
  store?: "localStorage" | "sessionStorage" | "cookies";
  key_name?: string;
  endPoint?: string;
  method?: "INSERT" | "UPSERT" | "DELETE" | "UPDATE";
  function?: (data: {
    values?: any;
    formik?: any;
    setErrors?: any;
    resetForm?: () => void;
    schema?: any;
  }) => Promise<void> | undefined;
};

export type FormData = {
  name: string;
  columns?: number;
  submit: Submit;
  items: Item[];
  grid?: number; // Assuming grid property is optional
};

type DynamicFormProps = {
  formData: any;
  className?: string;
  children: React.ReactNode;
  store?: "localStorage" | "sessionStorage" | "cookies";
  set_data_to_browser_store?: boolean;
  send_data_to_external_api?: boolean;
  endPoint?: "string";
  onSubmit?: (data: any) => void;
  defaultValue?: any;
  method?: "INSERT" | "UPSERT" | "DELETE" | "UPDATE";
  key_name?: string;
  allValues?: any;
  isRealTime?: boolean;
  setRealTimeValues?: (data: any) => void;
  noGap?: boolean;
};

interface FormikValues {
  [key: string]: Record<string, string | string[] | any[]>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formData,
  className,
  store,
  send_data_to_external_api,
  set_data_to_browser_store,
  endPoint,
  method,
  key_name,
  children,
  defaultValue,
  allValues = {},
  onSubmit: handleFormSubmit,
  isRealTime,
  setRealTimeValues,
  noGap = true,
}) => {
  // Inside your component
  const generateSchema = useCallback(
    (items: any, values: any, mode: any) => {
      return Yup.object(
        generateValidationSchema(
          (items as any)?.filter(
            (item: any) =>
              !item.variant?.includes("custom") || item.type === "HTML"
          ),
          values,
          mode
        )
      );
    },
    []
  );
  
  const [formItems, setFormItems] = useState(formData.items);
  const [validationSchema, setValidationSchema] = useState();

  const initialValues = defaultValue ?? generateInitialValues(formItems);

  const formik: {
    [x: string]: any;
    values: FormikValues;
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      // if stepper form
      if (handleFormSubmit) {
        handleFormSubmit(values);
      }
      // if not stepper form
      else {
        // Execute the function if defined in submit

        if (formData?.submit?.function) {
          formData.submit?.function({
            values,
            formik,
            setErrors,
            resetForm,
            schema: validationSchema,
          });
        } else {
          // for story book configuration
          if (
            store ||
            set_data_to_browser_store ||
            send_data_to_external_api ||
            endPoint
          ) {
            const newData = {
              store:
                set_data_to_browser_store && !send_data_to_external_api
                  ? store
                  : "", // local Storage, session Storage
              key_name:
                set_data_to_browser_store && !send_data_to_external_api
                  ? key_name
                  : "",
              endPoint:
                send_data_to_external_api && !set_data_to_browser_store
                  ? endPoint
                  : "",
              method:
                send_data_to_external_api && !set_data_to_browser_store
                  ? method
                  : "INSERT", // UPSERT, DELETE, UPDATE
            };
            try {
              await storeOrSendValueToApi({ data: newData, values });
              // Optionally show success message or perform other actions upon successful submission
              // alert(JSON.stringify(filterSubmittingValues(values)));
            } catch (error) {
              console.error("Error submitting form data:", error);
              // Handle error state or display error message
            }
          }
          // for original data submission
          else {
            try {
              await storeOrSendValueToApi({ data: formData.submit, values });
              // Optionally show success message or perform other actions upon successful submission
              alert(JSON.stringify(filterSubmittingValues(values)));
            } catch (error) {
              console.error("Error submitting form data:", error);
              // Handle error state or display error message
            }
          }
        }
      }
    },
  });

  useEffect(() => {
    const updateFormItems = () => {
      const updateItemsWithDependencies = (items: Item[] | any) => {
        return items?.map((item: any, index: number) => {
          item = checkDependency({
            item,
            values: formik.values,
            formik,
            allValues:
              Object.keys(allValues).length > 0 ? allValues : formik.values,
          });

          if (
            (item.tag === "repeater" || item.tag === "group") &&
            item?.form?.items?.length > 0
          ) {
            item.form.items = updateItemsWithDependencies(item?.form?.items);
          }

          // Handle the calculation logic for fields with "calculate"
          if (item?.calculate) {
            const { operator, fields } = item?.calculate;
            const fieldValues = fields.map(
              (fieldName: any) => formik.values[fieldName] || 0
            );

            let calculatedValue = parseFloat(fieldValues[0]); // Initialize with the first field value

            // Apply the calculation based on the operator
            for (let i = 1; i < fieldValues.length; i++) {
              switch (operator) {
                case "addition":
                  calculatedValue += parseFloat(fieldValues[i]);
                  break;
                case "subtraction":
                  calculatedValue -= parseFloat(fieldValues[i]);
                  break;
                case "multiplication":
                  calculatedValue *= parseFloat(fieldValues[i]);
                  break;
                case "division":
                  if (parseFloat(fieldValues[i]) !== 0) {
                    calculatedValue /= parseFloat(fieldValues[i]);
                  } else {
                    console.warn("Division by zero is not allowed");
                  }
                  break;
                default:
                  console.warn("Unknown operator");
              }
            }

            // Update the calculated field's value in Formik
            formik.setFieldValue(item.name, calculatedValue);
          }

          return item;
        });
      };

      const updatedItems = updateItemsWithDependencies(formItems);
      if (formik.values && Object.keys(formik.values).length > 0) {
        setValidationSchema(
          generateSchema(updatedItems, formik?.values, "update") as any
        );
        setFormItems(updatedItems);
      }
    };

    updateFormItems();
  }, [formik?.values, defaultValue]);

  useEffect(() => {
    if (isRealTime && typeof setRealTimeValues === "function") {
      setRealTimeValues(formik?.values);
    }
  }, [isRealTime, formik?.values]);

  const adjustWidths = (items: Item[] | any, innerWidth: number) => {
    return items?.map((item: any) => {
      if (item.widths && typeof item.widths === "object") {
        if (innerWidth > 1440) {
          item.width = item.widths.greaterThan1440;
        } else if (innerWidth > 890 && innerWidth <= 1440) {
          item.width = item.widths.between890And1440;
        } else if (innerWidth > 600 && innerWidth <= 890) {
          item.width = item.widths.between600And890;
        } else {
          item.width = item.widths.default;
        }
      }

      // Recursively adjust widths for nested items in fieldArray
      if (
        (item.tag === "repeater" || item.tag === "group") &&
        item.form &&
        item.form.items
      ) {
        item.form.items = adjustWidths(item.form.items, innerWidth);
      }

      return item;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const updateItemsWithDependencies = (items: Item[] | any) => {
        return items?.map((item: any, index: number) => {
          item = checkDependency({
            item,
            values: formik.values,
            formik,
            allValues:
              Object.keys(allValues).length > 0 ? allValues : formik.values,
          });

          if (
            (item.tag === "repeater" || item.tag === "group") &&
            item?.form?.items?.length > 0
          ) {
            item.form.items = updateItemsWithDependencies(item?.form?.items);
          }

          // Handle the calculation logic for fields with "calculate"
          if (item?.calculate) {
            const { operator, fields } = item?.calculate;
            const fieldValues = fields.map(
              (fieldName: any) => formik.values[fieldName] || 0
            );

            let calculatedValue = parseFloat(fieldValues[0]); // Initialize with the first field value

            // Apply the calculation based on the operator
            for (let i = 1; i < fieldValues.length; i++) {
              switch (operator) {
                case "addition":
                  calculatedValue += parseFloat(fieldValues[i]);
                  break;
                case "subtraction":
                  calculatedValue -= parseFloat(fieldValues[i]);
                  break;
                case "multiplication":
                  calculatedValue *= parseFloat(fieldValues[i]);
                  break;
                case "division":
                  if (parseFloat(fieldValues[i]) !== 0) {
                    calculatedValue /= parseFloat(fieldValues[i]);
                  } else {
                    console.warn("Division by zero is not allowed");
                  }
                  break;
                default:
                  console.warn("Unknown operator");
              }
            }

            // Update the calculated field's value in Formik
            formik.setFieldValue(item.name, calculatedValue);
          }

          return item;
        });
      };

      const updatedItemsWithValidation = updateItemsWithDependencies(
        formData.items
      );

      setFormItems(updatedItemsWithValidation);
      setValidationSchema(
        generateSchema(
          updatedItemsWithValidation,
          formik?.values,
          "initial"
        ) as any
      );
    };

    handleResize(); // Initial setup

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddFieldArrayItem = (name: string, items: Item[]) => {
    const newFieldArrayItem = generateInitialValues(items);
    formik.setFieldValue(name, [
      ...getIn(formik.values, name),
      newFieldArrayItem,
    ]);
  };

  const handleRemoveFieldArrayItem = (name: string, index: number) => {
    const fieldArray: any = [...getIn(formik.values, name)];
    fieldArray.splice(index, 1);
    formik.setFieldValue(name, fieldArray);
  };

  const [isOpen, setOpen] = useState(false);
  const addItem = (name = "", newItem: any) => {
    formik.setFieldValue(name, [...(formik.values?.[name] as any), newItem]);
    setOpen(false);
  };

  const renderRepeaterField = ({
    item,
    itemName,
    formik,
    handleRemoveFieldArrayItem,
    handleAddFieldArrayItem,
  }: {
    item: Item | any;
    itemName: string;
    formik: any;
    handleRemoveFieldArrayItem: (name: string, index: number) => void;
    handleAddFieldArrayItem: (name: string, items: Item[]) => void;
  }) => {
    const splittedWidth = item?.width?.split("%")?.[0];
    const gridSingleColumnWidth = 100 / formData?.grid;

    const gridColsDecorator = () => {
      const colsToSpan = splittedWidth / gridSingleColumnWidth;

      return Math.ceil(colsToSpan);
    };

    return (
      // @ts-ignore - JSX element implicitly has type 'any'
      <div
        key={item.id || `${Math.random() * 1000 + new Date().getTime()}`}
        style={{
          display: "grid!important",
          gridColumn: `span ${gridColsDecorator()}`,
        }}
        className="field-array-wrapper col-span-full space-y-3 rounded-md border border-muted-300 bg-primary-50 p-4 dark:rounded-md dark:border-muted-700 dark:bg-muted-800/65 dark:backdrop-blur-sm"
      >
        <p className="font-semibold text-muted-400 dark:text-muted-300">
          {item.label}
        </p>
        {(getIn(formik.values, itemName) || [])?.map(
          (fieldItem: Item, index: number) => {
            const fieldName = `${itemName}[${index}]`;
            // Apply checkDependency for the current field item
            const updatedItem: any = checkDependency({
              item,
              values: formik.values,
              formik,
              index,
              allValues:
                Object.keys(allValues).length > 0 ? allValues : formik.values,
            });

            if (updatedItem?.hidden) return null; // Skip rendering if hidden

            return (
              <div key={index} className="flex items-center gap-2">
                <div className="w-full rounded-md border border-muted-300 p-2 shadow-md dark:border-muted-700">
                  {renderFields({
                    items:
                      [...item?.form.items]
                        ?.sort((a, b) => a.index - b.index)
                        .map((item) => ({
                          ...item,
                          label: `${item.label} #${index + 1}`,
                        })) || [],
                    parentName: `${itemName}[${index}]`,
                    index,
                  })}
                </div>
                {getIn(formik.values, itemName).length > 1 ? (
                  <button
                    type="button"
                    onClick={() => handleRemoveFieldArrayItem(itemName, index)}
                    // className="w-8"
                    className="w-8 rounded-md border border-muted-300 p-2 shadow-md dark:border-muted-700"
                  >
                    <BiTrash />
                  </button>
                ) : null}
              </div>
            );
          }
        )}

        <button
          type="button"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            handleAddFieldArrayItem(itemName, item?.form.items);
          }}
          className="mt-4 p-2"
        >
          Add {item.placeholder}
        </button>
      </div>
    );
  };

  // render group fields
  const renderGroupField = ({
    item,
    itemName,
    formik,
  }: {
    item: Item | any;
    itemName: string;
    formik: any;
  }) => {
    const splittedWidth = item?.form?.width?.split("%")?.[0];
    const gridSingleColumnWidth = 100 / item.form?.grid;

    const gridColsDecorator = () => {
      const colsToSpan = splittedWidth / gridSingleColumnWidth;

      return Math.ceil(colsToSpan);
    };

    return (
      <div
        key={item.index}
        style={{}}
        className="group-array-wrapper col-span-full grid gap-2 rounded-md border bg-primary-50 p-4 dark:rounded-md dark:border dark:border-white dark:bg-primary"
      >
        {/* <p className="col-span-full font-semibold text-gray-600">{item.label}</p> */}

        {renderFields({
          items:
            [...item?.form?.items]?.sort((a, b) => a.index - b.index) || [],
          parentName: itemName,
        })}
      </div>
    );
  };

  // Sort items by index for grid layout

  const renderFields = useMemo(() => {
    return ({
      items,
      parentName = "",
      index = null,
    }: {
      items: Item[] | any;
      parentName?: string;
      index?: number | null;
    }) => {
      return items?.map((item: Item | any, i: number) => {
        if (item?.hidden) return null;

        const itemName = parentName
          ? `${parentName}.${item?.name}`
          : item?.name;
        const splittedWidth = item?.width?.split("%")?.[0];
        const gridSingleColumnWidth = 100 / formData?.grid;

        const gridColsDecorator = () => {
          const colsToSpan = splittedWidth / gridSingleColumnWidth;
          return Math.ceil(colsToSpan);
        };

        const {
          widths,
          depends,
          validation,
          width,
          required,
          matches,
          index,
          oneOf,
          ...rest
        } = item || {};

        if (item.tag === "repeater" && !item.variant) {
          // Evaluate dependencies
          return renderRepeaterField({
            item,
            itemName,
            formik,
            handleRemoveFieldArrayItem,
            handleAddFieldArrayItem,
          });
        } else if (item.tag === "repeater" && item.variant) {
          return (
            <InputRenderrer
              key={item.variant + item.name + i}
              {...rest}
              suggested="current-password"
              name={itemName}
              oldFormik={formik}
              item={item}
              addItem={addItem}
              open={isOpen}
              setOpen={setOpen}
              {...(item.type === "headless-radio" && {
                defaultValue: item.value,
              })}
            />
          );
        }

        if (item.tag === "group" && !item.variant) {
          // Evaluate dependencies
          return renderGroupField({
            item,
            itemName,
            formik,
          });
        }

        const touched = getIn(formik.touched, itemName);
        const error = getIn(formik.errors, itemName);
        const showError = touched && error;

        // console.log('grid cols decorator', gridColsDecorator());
        return (
          !item?.hidden && (
            <div
              key={
                item?.id ||
                `${Math.random() * 1000 + new Date().getTime()} + ${i}`
              }
              style={{
                gridColumn: `span ${gridColsDecorator()}`,
                overflow:
                  item.type === "select" && item.multiple
                    ? "visible"
                    : "hidden",
                // margin: '0 0'
              }}
            >
              {item.type === "HTML" ? (
                <div>{item?.children}</div>
              ) : (
                <InputRenderrer
                  {...rest}
                  autoComplete="current-password"
                  name={itemName}
                  value={getIn(formik.values, itemName)}
                  formik={formik}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  error={
                    getIn(formik?.errors, itemName) &&
                    getIn(formik?.touched, itemName)
                  }
                  {...(item.type === "headless-radio" && {
                    defaultValue: item.value,
                  })}
                />
              )}
            </div>
          )
        );
      });
    };
  }, [
    formik.values,
    formData?.grid,
    handleRemoveFieldArrayItem,
    handleAddFieldArrayItem,
    addItem,
    isOpen,
    setOpen,
  ]);

  const sortedItems = [...formItems]?.sort((a, b) => a.index - b.index);

  // console.log('sorted items', formik.errors, formik.values);
  return (
    <React.Fragment>
      <form onSubmit={formik?.handleSubmit} autoComplete="off">
        <div
          className={cn(
            `relative grid w-full ${!noGap && "px-4 py-3"} `,
            className && className
          )}
          style={{
            gridTemplateColumns: `repeat(${formData.grid || 1}, 1fr)`,
            gap: "0.5rem",
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          {renderFields({ items: sortedItems, parentName: undefined })}
        </div>
        {children}
      </form>
    </React.Fragment>
  );
};

export default DynamicForm;

export const InputRenderrer = (input: any) => {
  const signRef = useRef(null);
  const { type, ...rest } = input || {};
  switch (type) {
    case "email":
      return <Input type="email" {...rest} autoComplete="new-password" />;
    case "password":
      return <Password type="password" {...rest} autoComplete="new-password" />;
    // case 'phone':
    //   return <Phone {...rest} />;
    case "number":
      return <Number type="number" {...rest} />;
    case "select":
      return <Select {...rest} />;

    case "file":
      return (
        <File
          files={rest?.value}
          name={rest?.name}
          formik={rest?.formik}
          multiple={rest?.multiple}
          allowedFileTypes={["image/png", "image/jpeg", "application/pdf"]}
        />
      );

    case "textarea":
      return <Textarea autoComplete="new-password" {...rest} />;
    case "switch":
      return (
        <ToggleSwitch
          checked={getIn(rest.formik.values, rest.name)}
          {...rest}
        />
      );
    case "checkbox":
      return (
        <Checkbox checked={getIn(rest.formik.values, rest.name)} {...rest} />
      );

    case "select":
      switch (rest.multiple) {
        case true:
          return (
            <ComboSelect
              label={rest.label}
              placeholder={rest.placeholder}
              options={rest.options}
              floating={true}
              {...rest}
              onChange={(value) => {
                // setSelectedRole(value);
                // handleChange('selectedRole');
                rest.formik.setFieldValue(rest.name, value);
              }}
              value={getIn(rest.formik.values, rest.name)}
              multiple
              // floating={true}
              error={rest.formik.errors[rest.name]}

              // onBlur={() => handleBlur('selectedRole')}
            />
          );

        default:
          return (
            <Select error={getIn(rest.formik.errors, rest.name)} {...rest} />
          );
      }

    case "radio-group":
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { variant, ...props } = rest;

      return <RadioGroup {...props} />;

    case "checkbox-group":
      return <CheckboxGroup {...rest} />;

    case "signature":
      return <SignaturePanel {...rest} />;

    default:
      return <Input type={type} {...rest} autoComplete="new-password" />;
  }
};
