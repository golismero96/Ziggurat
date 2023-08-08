import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import CssBaseline from '@mui/material/CssBaseline';

import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { useEffect } from 'react';

import { setAttributesLinkStyle, useThemeMode } from './theme/ThemeContext';

const isBrowser = typeof document !== 'undefined';
let insertionPoint;

if (isBrowser) {
  const emotionInsertionPoint = document.querySelector(
    'meta[name="emotion-insertion-point"]'
  );
  insertionPoint = emotionInsertionPoint ?? undefined;
}

// Create rtl cache
const cacheRtl = createCache({
  key: 'mui-style-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
  insertionPoint
});

const cacheLtr = createCache({
  key: 'mui-style-ltr',
  insertionPoint
});
import '@fontsource/roboto'; // Defaults to weight 400
import '@fontsource/roboto/400.css'; // Specify weight
import '@fontsource/roboto/400-italic.css'; // Specify weight and style

function App() {
  const content = useRoutes(router);

  const { direction } = useThemeMode();

  useEffect(() => {
    setAttributesLinkStyle();
  }, [direction]);

  return (
    <CacheProvider value={direction === 'rtl' ? cacheRtl : cacheLtr}>
      <CssBaseline enableColorScheme={true} />
      {content}
    </CacheProvider>
  );
}
export default App;
