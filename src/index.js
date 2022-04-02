import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import alertTemplate from 'react-alert-template-basic';
// import persistStore from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const options = {
  timeout: 5000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE
}

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AlertProvider template={alertTemplate} {...options}>
        <App />
      </AlertProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
