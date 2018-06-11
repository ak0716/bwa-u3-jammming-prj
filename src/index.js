import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/App/App';
import JammmingApp from "./JammmingApp";
import registerServiceWorker from "./registerServiceWorker";

console.log("index.js");

ReactDOM.render(<JammmingApp />, document.getElementById("root"));
registerServiceWorker();

