import React, { useEffect } from 'react';
import styles from './App.module.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { SignInPage, RegisterPage, HomePage, 
        DetailPage, SearchPage, ShoppingCartPage, PlaceOrder} from './pages';
import { Navigate } from 'react-router-dom'
import { useSelector } from './redux/hooks'
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/slice'; 

const PrivateRoute = ( {children} ) => {
  const jwt = useSelector((s) => s.user.token)
  return jwt !== null ? children :<Navigate to='/SignIn'/>
}

function App() {
  const dispatch = useDispatch()
  const jwt = useSelector((s) => s.user.token)
  useEffect(() => {
    if(jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/SignIn' element={<SignInPage />}/>
          <Route path='/Register' element={<RegisterPage />}/>
          <Route path='/Detail/:touristRouteId' element={<DetailPage />}/>
          <Route path='/Search/:keywords' element={<SearchPage />}/>
          <Route path='/ShoppingCart' element={<PrivateRoute><ShoppingCartPage/></PrivateRoute>}/>
          <Route path='/PlaceOrder' element={<PrivateRoute><PlaceOrder/></PrivateRoute>}/>
          <Route path='/Search' element={<SearchPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
