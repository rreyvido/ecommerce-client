import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ArticleList from "./pages/ArticleList";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Dashboard from "./adminPages/Dashboard";
import Success from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="article">
            <Route path="" element={<ArticleList />} />
          </Route>
          <Route path="product">
            <Route path="" element={<ProductList />} />
          </Route>
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
        </Route>
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
