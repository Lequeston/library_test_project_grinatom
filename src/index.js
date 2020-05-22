import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import App from './App';
import * as serviceWorker from './serviceWorker';
import {compose, createStore, applyMiddleware} from "redux";
import rootReducer from "./redux/rootReducer";
import thunk from 'redux-thunk';

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  ),
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
