import React from 'react';
import styles from './App.module.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { SignInPage, RegisterPage, HomePage, DetailPage} from './pages';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='SignIn' element={<SignInPage />}/>
          <Route path='Register' element={<RegisterPage />}/>
          <Route path='Detail/:touristRouteId' element={<DetailPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
