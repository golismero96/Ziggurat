import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './theme/ThemeProvider';
import { store } from './setup/redux/store';
import { Provider } from 'react-redux';
import './i18n';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./setup/mocks/browser');
  worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </ThemeProvider>
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
  </LocalizationProvider>
);

serviceWorker.unregister();
reportWebVitals();
