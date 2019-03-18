// packages
import LocalizedStringsFactory, { LocalizedStrings, GlobalStrings } from 'react-native-localization';

// locales
import en from './locales/en';

// types
export interface LanguageStringsObject {
  [key: string]: string;
}

const t: LocalizedStrings<LanguageStringsObject> = new LocalizedStringsFactory({
  en
});

export default t;
