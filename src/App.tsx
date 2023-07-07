import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import RedirectRoute from './pages/RedirectRoute';

function App() {
  return (
    <div className="outer-wrapper">
      <div className="inner-wrapper">
        <Router>
          <Routes>
            <Route path='/tiny-link' element={<Home />}></Route>
            <Route path='/tiny-link/:shortenedURL' element={<RedirectRoute />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  )
}
export default App;
