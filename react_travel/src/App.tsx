import React from 'react';
import styles from './App.module.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { SignInPage, RegisterPage, HomePage, DetailPage, SearchPage} from './pages';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/SignIn' element={<SignInPage />}/>
          <Route path='/Register' element={<RegisterPage />}/>
          <Route path='/Detail/:touristRouteId' element={<DetailPage />}/>
          <Route path='/Search/:keywords' element={<SearchPage />}/>
          <Route path='/Search' element={<SearchPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
