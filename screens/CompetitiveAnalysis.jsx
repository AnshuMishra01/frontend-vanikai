import React, { useState } from 'react';
import { submitAnalysis } from '../../api';
import { useNavigate } from 'react-router-dom';


function CompetitiveAnalysis() {
  const [form, setForm] = useState({
    competitors: '',
    strengthsWeaknesses: '',
    opportunitiesThreats: '',
    differentiation: ''
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
      const res = await submitAnalysis(form, 'competitive');
      navigate('/analysis-result', { state: { result: res.message || JSON.stringify(res), type: 'Competitive Analysis' } });
    } catch (err) {
      navigate('/analysis-result', { state: { result: 'Error submitting analysis.', type: 'Competitive Analysis' } });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Competitive Analysis</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="competitors">Who do you see as your main competitors at the MVP stage?</label><br />
          <textarea id="competitors" name="competitors" value={form.competitors} onChange={handleChange} rows={2} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="strengthsWeaknesses">What are the strengths and weaknesses of these competitors?</label><br />
          <textarea id="strengthsWeaknesses" name="strengthsWeaknesses" value={form.strengthsWeaknesses} onChange={handleChange} rows={2} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="opportunitiesThreats">What opportunities and threats do you see in the current market?</label><br />
          <textarea id="opportunitiesThreats" name="opportunitiesThreats" value={form.opportunitiesThreats} onChange={handleChange} rows={2} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="differentiation">How do you plan to differentiate your MVP from existing solutions?</label><br />
          <textarea id="differentiation" name="differentiation" value={form.differentiation} onChange={handleChange} rows={2} style={{ width: '100%' }} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit for Analysis'}</button>
      </form>
    </div>
  );
}

export default CompetitiveAnalysis;
