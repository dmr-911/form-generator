interface DataItem {
    [key: string]: any;
  }
  
  interface ExcludeConfig {
    key: string;
    value: any;
  }
  
  interface ReformatConfig {
    value: string;
    label: string[];
    exclude?: ExcludeConfig;
  }
  
  function getNestedValue(obj: DataItem, path: string): any {
    return path.split('.').reduce((acc: any, part: string) => {
      const match = part.match(/(\w+)\[(\d+)\]/);
      if (match) {
        return acc && acc[match[1]] ? acc[match[1]][parseInt(match[2])] : undefined;
      }
      return acc ? acc[part] : undefined;
    }, obj);
  }
  
  function shouldExclude(item: DataItem, excludeConfig?: ExcludeConfig): boolean {
    if (!excludeConfig) return false;
  
    const { key, value: excludeValue } = excludeConfig;
    const fieldValue = item[key];
  
    if (Array.isArray(excludeValue)) {
      return Array.isArray(fieldValue) && fieldValue.length === 0;
    }
  
    if (typeof excludeValue === 'object' && excludeValue !== null) {
      return (
        typeof fieldValue === 'object' && fieldValue !== null && Object.keys(fieldValue).length === 0
      );
    }
  
    return fieldValue === excludeValue;
  }
  
  export function comboboxReformatData(dataArray: DataItem[], config?: ReformatConfig): DataItem[] {
    if (!config) {
      return dataArray.map((item) => ({ value: item, label: item }));
    }
    return dataArray
      ?.filter((item) => !shouldExclude(item, config?.exclude))
      .map((item) => ({
        ...item,
        value: config && config.value ? item[config.value] : item,
        label:
          config && config.label
            ? config.label
                .map((labelField) => {
                  const value = getNestedValue(item, labelField);
                  return typeof value === 'string' ? value.replace(/_/g, ' ') : '';
                })
                .filter(Boolean)
                .join(' ')
            : item
      }));
  }
  