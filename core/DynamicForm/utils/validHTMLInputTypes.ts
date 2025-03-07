import { FormData, Item } from '..';

const validHtmlInputTypes = [
  'text',
  'email',
  'password',
  'number',
  'checkbox',
  'radio',
  'textarea',
  'select',
  'date',
  'file', // and other valid HTML input types
  'radio-group'
];

export const hasValidHtmlInputInForm = (formData: FormData) =>{
    
    return formData?.some((item: Item) => {
        const itemType = item?.type?.toLowerCase();
        // console.log(`Checking item type: ${itemType}`); // Debugging line to see which types are being checked
        return validHtmlInputTypes.includes(itemType);
      })
};

export const hasRequiedInputInForm = (formData: FormData) =>{
    return formData?.some((item: Item) => {
        const itemType = item?.type?.toLowerCase();
        // console.log(`Checking item type: ${itemType}`); // Debugging line to see which types are being checked
        return validHtmlInputTypes.includes(itemType) && item.required;
      })
}
