import { DynamicForm } from "../core";

export default DynamicForm;

export const Capitalize = ({ str }: { str: string }) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
