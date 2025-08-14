import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Task } from './page/Task'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<Task/>} path='/' />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
