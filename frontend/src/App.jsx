import React from 'react'
import { BrowserRouter } from "react-router-dom";
import './App.css'
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
          <Header />
          <Main />
        </BrowserRouter>
          <Footer />
    </>
      
  )
}

export default App
