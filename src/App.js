import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./pages/Landing";
import ArticleList from "./pages/ArticleList";
import { ProductList, Product } from "./pages/Product";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Dashboard from "./adminPages/Dashboard";
import Success from "./pages/Success";
import Order from "./pages/Order";
import { Login, Profile, Register } from "./pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="article">
              <Route path="" element={<ArticleList />} />
            </Route>
            <Route path="product">
              <Route path="" element={<ProductList />} />
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="order" element={<Order />} />
          </Route>
          <Route path="/dashboard">
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
