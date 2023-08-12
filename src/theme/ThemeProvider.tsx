import { ThemeProvider } from '@mui/system';
import { themeCreator } from './base';
import { ThemeUIProvider as ThemeUIContextProvider } from './ThemeContext';
import React, { FC, useState } from 'react';

const ThemeProviderWrapper: FC<any> = (props) => {
  const MainTheme = themeCreator('PureLightTheme');

  // const themeUIEvents: ThemeContextInterface = {
  //   toggleMode: (mode: PaletteMode) => {
  //     console.log('22222222');
  //     theme.palette.mode = mode;
  //   }
  // };

  return (
    <ThemeUIContextProvider>
      {' '}
      {/* ThemeUIEvents={themeUIEvents} */}
      <ThemeProvider theme={MainTheme}>{props.children}</ThemeProvider>
    </ThemeUIContextProvider>
  );
};
export default ThemeProviderWrapper;
