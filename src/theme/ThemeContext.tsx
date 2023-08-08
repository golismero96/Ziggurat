import React, {
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { Direction } from '@mui/system';
import { PaletteMode, useTheme } from '@mui/material';
import { isEqual, isFunction } from 'lodash';

export interface ThemeContextInterface {
  themeMode: PaletteMode;
  setThemeMode: (nextThemeMode: SetStateAction<PaletteMode>) => void;
  direction: Direction;
  setDirection: (nextDirection: SetStateAction<Direction>) => void;
}

interface ThemeUiContextInterface {
  ThemeUIEvents?: ThemeContextInterface;
  children: React.ReactNode;
}

const ThemeModeKey = 'theme_mode';
const I18N_CONFIG_KEY = 'i18nextLng';

export const initialStateThemoMode: PaletteMode = 'light';
export const initialStateDirection: Direction = 'rtl';

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

export const getDirection = (): Direction => {
  const ls = localStorage.getItem(I18N_CONFIG_KEY) ?? initialStateDirection;
  if (ls) {
    try {
      return ls as Direction;
    } catch (er) {
      console.error(er);
    }
  }
  return initialStateDirection;
};

export function setAttributesLinkStyle() {
  const lan = localStorage.getItem(I18N_CONFIG_KEY);
  const htmlPage = document.querySelector('html');

  if (lan === 'en') {
    htmlPage?.setAttribute('dir', 'ltr');
    htmlPage?.setAttribute('style', 'direction: ltr');
  } else {
    htmlPage?.setAttribute('dir', 'rtl');
    htmlPage?.setAttribute('style', 'direction: rtl');
  }
}

const defaultThemeMode: ThemeContextInterface = {
  themeMode: getThemeModeFromLocalStorage(ThemeModeKey),
  setThemeMode: (_mode: PaletteMode) => {},
  direction: getDirection(),
  setDirection: (_direction: Direction) => {}
};

const ThemeUIContext = createContext<ThemeContextInterface>({
  themeMode: defaultThemeMode.themeMode,
  setThemeMode: (_mode: PaletteMode) => {},
  direction: defaultThemeMode.direction,
  setDirection: (_direction: Direction) => {}
});

const useThemeMode = () => useContext<ThemeContextInterface>(ThemeUIContext);

const ThemeUIProvider: React.FC<ThemeUiContextInterface> = ({
  ThemeUIEvents,
  children
}) => {
  const theme = useTheme();
  const [themeMode, setThemeModeBase] = useState<PaletteMode>('dark');
  const [direction, setDirectionBase] = useState<Direction>('rtl');

  const setDirection = useCallback((nextDirection: SetStateAction<any>) => {
    setDirectionBase((prevDirection: Direction) => {
      if (isFunction(nextDirection)) {
        nextDirection = nextDirection(prevDirection);
      }

      if (isEqual(nextDirection, prevDirection)) {
        return prevDirection;
      }

      return nextDirection;
    });
  }, []);

  const setThemeMode = (_mode: PaletteMode) => {
    console.log('4444444444');
    const updatedMode = _mode;
    setThemeModeBase(updatedMode);
    // themeModeSwitchHelper(updatedMode)
    if (localStorage) {
      localStorage.setItem(ThemeModeKey, updatedMode);
    }
    theme.palette.mode = _mode;
    document.documentElement.setAttribute('data-theme', updatedMode);
  };

  useEffect(() => {
    // Update the web page with a focus on the page
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setThemeMode(getThemeModeFromLocalStorage(ThemeModeKey));
        if (direction) {
          setDirection(getDirection());
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
    direction,
    setDirection,
    themeMode,
    setThemeMode
  };
  return (
    <ThemeUIContext.Provider value={value}>{children}</ThemeUIContext.Provider>
  );
};

export { ThemeUIProvider, useThemeMode };
