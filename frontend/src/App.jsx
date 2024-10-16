import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import OCRReaderPage from './pages/OcrReader';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<OCRReaderPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
