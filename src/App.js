import "./App.css";
import DefaultViews from "./MainView/DefaultView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  return (
    <>
      <ToastContainer />
      <DefaultViews />
    </>
  );
}

export default App;
