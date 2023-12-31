import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { PaletteMode } from '@mui/material';
import { useTranslation } from 'react-i18next';

export type TypeLanguage = 'en' | 'fa';

export interface ThemeContextInterface {
  themeMode?: PaletteMode;
  setThemeMode?: (nextThemeMode: SetStateAction<PaletteMode>) => void;
  toggleMode: (mode: PaletteMode) => void;
  language?: TypeLanguage;
  setLanguage?: (nextLanguage: SetStateAction<TypeLanguage>) => void;
  toggleFontFamily: () => void;
}

interface ThemeUiContextInterface {
  ThemeUIEvents?: ThemeContextInterface;
  children: React.ReactNode;
}

const THEME_MODE_KEY = 'theme_mode';
const I18N_CONFIG_KEY = 'i18nextLng';

export const initialStateThemoMode: PaletteMode = 'light';
export const initialStateLanguage: TypeLanguage = 'fa';

export const getThemeModeFromLocalStorage = (): PaletteMode => {
  if (!localStorage) {
    return initialStateThemoMode;
  }

  const data = localStorage.getItem(THEME_MODE_KEY);

  if (data === 'dark' || data === 'light') {
    return data;
  } else {
    return initialStateThemoMode;
  }
};

export const getLanguage = (): TypeLanguage => {
  const lan = localStorage.getItem(I18N_CONFIG_KEY) ?? initialStateLanguage;
  return lan as TypeLanguage;
};

export const setAttributesLinkStyle = () => {
  const lan = getLanguage();
  const htmlPage = document.querySelector('html');

  if (lan === 'en') {
    htmlPage?.setAttribute('dir', 'ltr');
    htmlPage?.setAttribute('style', 'language: ltr');
  } else {
    htmlPage?.setAttribute('dir', 'rtl');
    htmlPage?.setAttribute('style', 'language: rtl');
  }
};

const defaultThemeMode: ThemeContextInterface = {
  themeMode: getThemeModeFromLocalStorage(),
  setThemeMode: (_mode: PaletteMode) => {},
  toggleMode: (_mode: PaletteMode) => {},
  language: getLanguage(),
  setLanguage: (_language: TypeLanguage) => {},
  toggleFontFamily: () => {}
};

const ThemeUIContext = createContext<ThemeContextInterface>(defaultThemeMode);

const useThemeMode = () => useContext<ThemeContextInterface>(ThemeUIContext);

const ThemeUIProvider: React.FC<ThemeUiContextInterface> = ({
  ThemeUIEvents,
  children
}) => {
  const { i18n } = useTranslation();
  const [themeMode, setThemeModeBase] = useState<PaletteMode>(
    initialStateThemoMode
  );
  const [language, setLanguageBase] = useState<TypeLanguage>(getLanguage());

  const setLanguage = (_language: TypeLanguage) => {
    const updatedLanguage = _language;
    setLanguageBase(updatedLanguage);
    if (localStorage) {
      localStorage.setItem(I18N_CONFIG_KEY, updatedLanguage);
    }
    setAttributesLinkStyle();
    // TODO: وقتی تم در لوکال استوریج دارک هست و ظاهر سایت هم دارک هست. به یک تب دیگر جابجا بشیم و برگردیم روی تب پنل، ظاهر روشن میشه. بخاطره کد زیر . باید یک فکری براش بشه
    ThemeUIEvents?.toggleFontFamily();
  };

  const setThemeMode = (_mode: PaletteMode) => {
    setThemeModeBase(_mode);
    if (localStorage) {
      localStorage.setItem(THEME_MODE_KEY, _mode);
    }
    ThemeUIEvents?.toggleMode(_mode);
    document.documentElement.setAttribute('data-theme', _mode);
  };

  useEffect(() => {
    // Update the web page with a focus on the page
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setThemeMode(getThemeModeFromLocalStorage());
        if (language) {
          const newLanguage = getLanguage();
          setLanguage(newLanguage);
          i18n.changeLanguage(newLanguage);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const value: ThemeContextInterface = {
    language,
    setLanguage,
    toggleMode: ThemeUIEvents?.toggleMode,
    themeMode,
    setThemeMode,
    toggleFontFamily: ThemeUIEvents?.toggleFontFamily
  };
  return (
    <ThemeUIContext.Provider value={value}>{children}</ThemeUIContext.Provider>
  );
};

export { ThemeUIProvider, useThemeMode };
