import './App.css';
// import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from './components/LandingPage';
import Error from './components/Error';

export default function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/error/:error' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
  }