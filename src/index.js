import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore
(
    reducer,
    applyMiddleware(thunk)
);
console.log("store state==>"+store.getState())
console.log("json"+JSON.stringify(store.getState()))

ReactDOM.render(
    <Provider store={store}><App/></Provider>
    , document.getElementById('root'));
registerServiceWorker();
