import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Route";
import "./custom.css";
import {Web3AuthProvider} from "./components/Web3/Web3AuthProvider.jsx";

function App() {
  return (
    <>
      <Web3AuthProvider>
          <RouterProvider router={router} />
          <Toaster></Toaster>
      </Web3AuthProvider>
    </>
  );
}

export default App;
