import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import AppRoutes from "./start/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import ContextUser from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextForm from "./context/FormContext";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ContextUser>
        <ContextForm>
          <AppRoutes />
        </ContextForm>
      </ContextUser>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
