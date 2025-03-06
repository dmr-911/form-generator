
import {comboboxReformatData} from "./comboboxReformatData";

function replaceUnderscoresWithSpaces(text: string) {
  return text.replace(/_/g, ' ');
}

export { replaceUnderscoresWithSpaces, comboboxReformatData };