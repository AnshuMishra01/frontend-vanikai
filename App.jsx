import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import MVPMarketAnalysis from './screens/MVPMarketAnalysis';
import MarketDetails from './screens/MarketDetails';
import CompetitiveAnalysis from './screens/CompetitiveAnalysis';
import AnalysisResult from './screens/AnalysisResult';
import Home from './screens/Home';
import QAFlow from './screens/QAFlow';
import LoadingScreen from './screens/LoadingScreen';
import Navbar from './Navbar';
import IntroSequence from './screens/IntroSequence';



function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroSequence onFinish={() => setShowIntro(false)} />}
      {!showIntro && (
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
      )}
    </>
  );
}

export default App;
