import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import '@fontsource/roboto';
import 'nprogress/nprogress.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import ThemeProvider from './theme/ThemeProvider';
import App from 'src/App';
import { store } from './setup/redux/store';
import * as serviceWorker from 'src/serviceWorker';
import reportWebVitals from './reportWebVitals';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./setup/mocks/browser');
  worker.start({
    onUnhandledRequest: 'bypass'
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));

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
