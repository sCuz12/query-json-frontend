import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme,MantineProvider} from '@mantine/core'
import '@mantine/dropzone/styles.css';
// core styles are required for all packages
import '@mantine/core/styles.css';
import 'react-json-view-lite/dist/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
    colors: {
        white: ['#ffffff'],
    },
});

root.render(
  
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
