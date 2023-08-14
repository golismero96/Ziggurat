import React, {
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { PaletteMode, useTheme } from '@mui/material';
import { isEqual, isFunction } from 'lodash';

type TypeLanguage = 'en' | 'fa';

export interface ThemeContextInterface {
  themeMode?: PaletteMode;
  setThemeMode?: (nextThemeMode: SetStateAction<PaletteMode>) => void;
  toggleMode: (mode: PaletteMode) => void;
  language?: TypeLanguage;
  setLanguage?: (nextLanguage: SetStateAction<TypeLanguage>) => void;
}

interface ThemeUiContextInterface {
  ThemeUIEvents?: ThemeContextInterface;
  children: React.ReactNode;
}

const ThemeModeKey = 'theme_mode';
const I18N_CONFIG_KEY = 'i18nextLng';

export const initialStateThemoMode: PaletteMode = 'light';
export const initialStateLanguage: TypeLanguage = 'fa';

const getThemeModeFromLocalStorage = (lsKey: string): PaletteMode => {
  if (!localStorage) {
    return initialStateThemoMode;
  }

  const data = localStorage.getItem(lsKey);

  if (data === 'dark' || data === 'light') {
    return data;
  } else {
    return initialStateThemoMode;
  }
};

export const getLanguage = (): TypeLanguage => {
  const ls = localStorage.getItem(I18N_CONFIG_KEY) ?? initialStateLanguage;
  if (ls) {
    try {
      return ls as TypeLanguage;
    } catch (er) {
      console.error(er);
    }
  }
  return initialStateLanguage;
};

export function setAttributesLinkStyle() {
  const lan = localStorage.getItem(I18N_CONFIG_KEY);
  const htmlPage = document.querySelector('html');

  if (lan === 'en') {
    htmlPage?.setAttribute('dir', 'ltr');
    htmlPage?.setAttribute('style', 'language: ltr');
  } else {
    htmlPage?.setAttribute('dir', 'rtl');
    htmlPage?.setAttribute('style', 'language: rtl');
  }
}

const defaultThemeMode: ThemeContextInterface = {
  themeMode: getThemeModeFromLocalStorage(ThemeModeKey),
  setThemeMode: (_mode: PaletteMode) => {},
  toggleMode: (_mode: PaletteMode) => {},
  language: getLanguage(),
  setLanguage: (_language: TypeLanguage) => {}
};

const ThemeUIContext = createContext<ThemeContextInterface>(defaultThemeMode);

const useThemeMode = () => useContext<ThemeContextInterface>(ThemeUIContext);

const ThemeUIProvider: React.FC<ThemeUiContextInterface> = ({
  ThemeUIEvents,
  children
}) => {
  const theme = useTheme();
  const [themeMode, setThemeModeBase] = useState<PaletteMode>(
    initialStateThemoMode
  );
  const [language, setLanguageBase] =
    useState<TypeLanguage>(initialStateLanguage);

  const setLanguage = useCallback((nextLanguage: SetStateAction<any>) => {
    setLanguageBase((prevLanguage: TypeLanguage) => {
      if (isFunction(nextLanguage)) {
        nextLanguage = nextLanguage(prevLanguage);
      }

      if (isEqual(nextLanguage, prevLanguage)) {
        return prevLanguage;
      }

      return nextLanguage;
    });
  }, []);

  const setThemeMode = (_mode: PaletteMode) => {
    const updatedMode = _mode;
    setThemeModeBase(updatedMode);
    if (localStorage) {
      localStorage.setItem(ThemeModeKey, updatedMode);
    }
    ThemeUIEvents?.toggleMode(_mode);
    document.documentElement.setAttribute('data-theme', updatedMode);
  };

  useEffect(() => {
    // Update the web page with a focus on the page
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setThemeMode(getThemeModeFromLocalStorage(ThemeModeKey));
        if (language) {
          setLanguage(getLanguage());
          setAttributesLinkStyle();
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
    setThemeMode
  };
  return (
    <ThemeUIContext.Provider value={value}>{children}</ThemeUIContext.Provider>
  );
};

export { ThemeUIProvider, useThemeMode };
