import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Map from './components/Map';
import AppBar from './components/AppBar';
import reduxStore from './redux';
import { Provider } from 'react-redux';
ReactDOM.render(
  <Provider store={reduxStore}>
    <div>
      <AppBar/>
      <Map/>
    </div>
  </Provider>,
  document.getElementById('app')
);
