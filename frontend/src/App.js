import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Route,Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>    <ToastContainer />
       <Routes>
  <Route path="/" element={<Register/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    </Routes></>
 

  );
}

export default App;
