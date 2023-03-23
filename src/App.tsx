import { Route, Routes } from "react-router-dom"
import './App.css'
import Product from "./components/productList"
import ProductAdd from "./components/productAdd"
import ProductEdit from "./components/productEdit"
function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/add" element={<ProductAdd />} />
        <Route path="/edit/:id" element={<ProductEdit />} />
      </Routes>
    </div>

  )
}

export default App
