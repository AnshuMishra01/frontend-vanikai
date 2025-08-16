import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MVPMarketAnalysis from './frontend-vanikai/screens/MVPMarketAnalysis';
import MarketDetails from './frontend-vanikai/screens/MarketDetails';
import CompetitiveAnalysis from './frontend-vanikai/screens/CompetitiveAnalysis';
import AnalysisResult from './frontend-vanikai/screens/AnalysisResult';
import Home from './frontend-vanikai/screens/Home';
import QAFlow from './frontend-vanikai/screens/QAFlow';
import LoadingScreen from './frontend-vanikai/screens/LoadingScreen';
import Navbar from './Navbar';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mvp-market-analysis" element={<MVPMarketAnalysis />} />
        <Route path="/market-details" element={<MarketDetails />} />
        <Route path="/competitive-analysis" element={<CompetitiveAnalysis />} />
  <Route path="/analysis-result" element={<AnalysisResult />} />
  <Route path="/start/:type" element={<QAFlow />} />
  <Route path="/loading" element={<LoadingScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
