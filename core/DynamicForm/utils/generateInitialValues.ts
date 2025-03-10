import { Item } from "..";

export const generateInitialValues = (items: Item[]): Record<string, any> => {
  return items?.reduce((values: Record<string, any>, item: Item) => {
    if (item.tag === "repeater" && item.form?.items) {
      if (item.variant) {
        values[item.name as string] = [];
      } else {
        values[item.name as string] = [generateInitialValues(item.form.items)];
      }
    } else if (item.tag === "group" && item.form?.items) {
      values[item.name as string] = generateInitialValues(item.form.items);
    } else {
      values[item.name as string] = getDefaultValue(item.type, item?.multiple);
    }
    return values;
  }, {} as Record<string, any>);
};

export const getDefaultValue = (type?: string, multiple?: boolean): any => {
  switch (type) {
    case "text":
    case "textarea":
    case "email":
      return "";
    case "checkbox":
      return false;
    case "select":
      return multiple ? [] : "";
    case "switch":
      return false;
    case "object":
      return {};
    case "number":
      return null;
    default:
      return "";
  }
};
