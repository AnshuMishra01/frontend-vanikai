import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitAnalysis } from '../api';

const loadingTexts = [
  'Analyzing your answers...'
  ,'Crunching real market data...'
  ,'Checking latest trends and competitors...'
  ,'Validating assumptions...'
  ,'Building your pitch deck analysis...'
  ,'Almost done!'
];

function LoadingScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, answers } = location.state || {};

  useEffect(() => {
    if (!type || !answers) return;
    const timer = setTimeout(async () => {
      try {
        const res = await submitAnalysis(answers, type);
        navigate('/analysis-result', { state: { result: res.message, type } });
      } catch {
        navigate('/analysis-result', { state: { result: 'Error generating analysis.', type } });
      }
    }, 2500 + Math.random() * 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, [type, answers, navigate]);

  const randomText = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];

  return (
    <div style={{ maxWidth: 500, margin: '100px auto', textAlign: 'center', padding: 32 }}>
      <div className="loader" style={{ marginBottom: 32 }}>
        <div style={{ width: 48, height: 48, border: '6px solid #eee', borderTop: '6px solid #0078d4', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
      </div>
      <h2>Generating your analysis...</h2>
      <div style={{ color: '#666', marginTop: 24, fontSize: 18 }}>{randomText}</div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoadingScreen;
