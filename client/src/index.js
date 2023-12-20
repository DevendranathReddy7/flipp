import React from 'react';
import ReactDOM from 'react-dom/client';
import './assests/styles/bootstrap.custom.css';
import './assests/styles/index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage';
import ProductDetailPage from './pages/ProductDetailPage';
import { Provider } from 'react-redux';
import store from './store';
import CartPage from './pages/CartPage';
import LoginPage from './slices/LoginPage';
import RegisterPage from './slices/RegisterPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Homepage />} />
      <Route path='/product/:prdid' element={<ProductDetailPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
