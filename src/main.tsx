import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
/** vite-plugin-svg-icons symbol引用 js插入脚本引入 */
import "virtual:svg-icons-register";
/** iconfont symbol引用 js插入脚本引入 */
import "../public/fonts/iconfont.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
