import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './app/app';
import {
  GlobalStyle,
  SanitizeResetStyle,
  defaultTheme
} from '@panoramic/theme';

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <SanitizeResetStyle />
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
