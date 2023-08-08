import { ThemeProvider } from '@mui/system';
import { themeCreator } from './base';
import { ThemeUIProvider as ThemeUIContextProvider } from './ThemeContext';
import React, { FC } from 'react';

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

const ThemeProviderWrapper: FC<any> = (props) => {
  const MainTheme = themeCreator('PureLightTheme');

  return (
    <ThemeUIContextProvider>
      <ThemeProvider theme={MainTheme}>{props.children}</ThemeProvider>
    </ThemeUIContextProvider>
  );
};
export default ThemeProviderWrapper;
