import React, { useState } from 'react';
import { submitAnalysis } from '../api';
import { useNavigate } from 'react-router-dom';


function MarketDetails() {
  const [form, setForm] = useState({
    marketDescription: '',
    pmfApproach: '',
    launchPlan: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitAnalysis(form, 'market');
      navigate('/analysis-result', { state: { result: res.message || JSON.stringify(res), type: 'Market Details & Product-Market Fit' } });
    } catch (err) {
      navigate('/analysis-result', { state: { result: 'Error submitting analysis.', type: 'Market Details & Product-Market Fit' } });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Market Details & Product-Market Fit</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="marketDescription">Describe your target market and its current state:</label><br />
          <textarea id="marketDescription" name="marketDescription" value={form.marketDescription} onChange={handleChange} rows={3} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="pmfApproach">How will you approach product-market fit for your MVP?</label><br />
          <textarea id="pmfApproach" name="pmfApproach" value={form.pmfApproach} onChange={handleChange} rows={3} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="launchPlan">Where do you plan to launch first and why?</label><br />
          <textarea id="launchPlan" name="launchPlan" value={form.launchPlan} onChange={handleChange} rows={3} style={{ width: '100%' }} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit for Analysis'}</button>
      </form>
    </div>
  );
}

export default MarketDetails;
