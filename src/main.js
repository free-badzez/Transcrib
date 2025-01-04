"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_tsx_1 = require("./App.tsx");
require("./index.css");
var rootElement = document.getElementById('root');
if (!rootElement)
    throw new Error('Failed to find the root element');
(0, client_1.createRoot)(rootElement).render(<react_1.default.StrictMode>
    <App_tsx_1.default />
  </react_1.default.StrictMode>);
