import React, { useState } from 'react';
import { submitAnalysis } from '../api';
import { useNavigate } from 'react-router-dom';



function MVPMarketAnalysis() {
  const [form, setForm] = useState({
    idea: '',
    problem: '',
    targetCustomer: '',
    uniqueValue: '',
    mvpVision: '',
    targetMarket: '',
    assumptions: ''
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
      const res = await submitAnalysis(form, 'mvp');
      navigate('/analysis-result', { state: { result: res.message || JSON.stringify(res), type: 'MVP Market Analysis' } });
    } catch (err) {
      navigate('/analysis-result', { state: { result: 'Error submitting analysis.', type: 'MVP Market Analysis' } });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>MVP Market Analysis</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="idea">Describe your startup idea in detail:</label><br />
          <textarea id="idea" name="idea" value={form.idea} onChange={handleChange} rows={3} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="problem">What problem does your idea solve?</label><br />
          <textarea id="problem" name="problem" value={form.problem} onChange={handleChange} rows={2} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="targetCustomer">Who is your target customer? (Describe their characteristics, needs, etc.)</label><br />
          <textarea id="targetCustomer" name="targetCustomer" value={form.targetCustomer} onChange={handleChange} rows={2} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="uniqueValue">What is unique about your solution compared to existing options?</label><br />
          <textarea id="uniqueValue" name="uniqueValue" value={form.uniqueValue} onChange={handleChange} rows={2} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="mvpVision">How do you envision your MVP? (Key features, user experience, etc.)</label><br />
          <textarea id="mvpVision" name="mvpVision" value={form.mvpVision} onChange={handleChange} rows={2} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="targetMarket">What is your initial target market or region?</label><br />
          <textarea id="targetMarket" name="targetMarket" value={form.targetMarket} onChange={handleChange} rows={2} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="assumptions">What are your main assumptions about the market or users?</label><br />
          <textarea id="assumptions" name="assumptions" value={form.assumptions} onChange={handleChange} rows={2} style={{ width: '100%' }} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit for Analysis'}</button>
      </form>
    </div>
  );
}

export default MVPMarketAnalysis;
