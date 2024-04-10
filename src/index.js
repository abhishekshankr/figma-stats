import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';

ReactDOM.render(
  <CssVarsProvider>
    <App />
  </CssVarsProvider>,
  document.getElementById('root')
);
