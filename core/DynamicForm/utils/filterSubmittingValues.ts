export const filterSubmittingValues = (values: Record<string, any>): Record<string, any> => {
  let newValues: Record<string, any> = {}; // Explicitly define newValues

  Object.keys(values).forEach((key) => {
    if (Array.isArray(values[key])) {
      newValues[key] = values[key].map((mappedValues) => filterSubmittingValues(mappedValues));
    } else if (values[key]) {
      newValues[key] = values[key];
    }
  });

  return newValues;
};
