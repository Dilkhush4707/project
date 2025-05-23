import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {Navigate, Route ,Routes} from 'react-router-dom'
import Search from "./pages/search.tsx";
import Product from "./pages/product.tsx";

function App() {
  const [count, setCount] = useState(0);

  return <>
  <Routes>
    <Route path='/' element={<Navigate to='/search'/>} />
    <Route path='/search' element={<Search/>}/>
    <Route path='/product/:productId' element={<Product/>} />
  </Routes></>;
}

export default App;
