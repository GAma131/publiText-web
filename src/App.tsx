import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePost />} />
      </Routes>
    </Router>
  )
}

export default App
