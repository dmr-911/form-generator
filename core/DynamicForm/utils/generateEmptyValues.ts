import { Item } from '../DynamicForm';

export const generateEmptyValues = (items: Item[]) => {
  return items.reduce((values, item) => {
    if (item.tag === 'repeater') {
      values[item.name] = generateEmptyValues(item?.form?.items);
    } else {
      values[item.name] = '';
    }
    return values;
  }, {});
};
