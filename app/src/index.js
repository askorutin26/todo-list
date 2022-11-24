
import ReactDOM from 'react-dom/client';
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import init from "./init.jsx";


const app = ()  => {  
  const vdom =  init();
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(vdom)
};
app();

reportWebVitals();
