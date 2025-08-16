
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AnalysisResult.css';

function AnalysisResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, type } = location.state || {};

  if (!result) {
    return (
      <div className="analysis-root">
        <div className="analysis-title">No Analysis Result</div>
        <button className="qaflow-btn" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="analysis-root">
      <div className="analysis-main-card">
        <div className="analysis-title">Analysis Result</div>
        <div className="analysis-type">Type: {type}</div>
        <div className="analysis-content">
          {/* Split result into sections by double newlines for card separation */}
          {result.split(/\n\n+/).map((section, idx) => (
            <div className="analysis-section-card" key={idx}>
              {section.split(/\n/).map((line, i) => {
                // Headings
                if (/^#+ /.test(line)) {
                  const level = line.match(/^#+/)[0].length;
                  const text = line.replace(/^#+\s*/, '');
                  if (level === 3) return <h3 key={i}>{text}</h3>;
                  if (level === 4) return <h4 key={i}>{text}</h4>;
                  return <h5 key={i}>{text}</h5>;
                }
                // List items
                if (/^\s*\*/.test(line)) {
                  // Bold inside list
                  const html = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                  return <div key={i} style={{ marginLeft: 18 }} dangerouslySetInnerHTML={{ __html: html }} />;
                }
                // Bold lines
                if (/^\*\*(.*?)\*\*$/.test(line.trim())) {
                  return <div key={i} style={{ fontWeight: 700 }}>{line.replace(/\*\*/g, '')}</div>;
                }
                // Bold inline
                if (line.includes('**')) {
                  const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
                  return <div key={i}>{parts.map((part, j) => part.startsWith('**') ? <strong key={j}>{part.replace(/\*\*/g, '')}</strong> : part)}</div>;
                }
                // Horizontal rule
                if (/^---+$/.test(line.trim())) {
                  return <hr key={i} />;
                }
                // Default
                return <div key={i}>{line}</div>;
              })}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button className="qaflow-btn" onClick={() => navigate(-1)}>Back to Form</button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResult;
