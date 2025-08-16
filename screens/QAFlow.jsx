
import React, { useState, useRef, useEffect } from 'react';
// Counter import not needed here
import gsap from 'gsap';
import { useParams, useNavigate } from 'react-router-dom';
import './QAFlow.css';

const flows = {
  mvp: [
    {
      key: 'idea',
      label: 'Describe your startup idea in detail',
      definition: 'Summarize your idea in one or two sentences. What is your product or service? Who is it for?',
      example: 'Eg: "A platform that helps remote teams collaborate on design projects in real time."',
      suggestions: [
        'A mobile app for...',
        'A SaaS tool for...',
        'A marketplace connecting...'
      ]
    },
    {
      key: 'problem',
      label: 'What problem does your idea solve?',
      definition: 'Explain the pain point or need your startup addresses.',
      example: 'Eg: "Remote teams struggle to keep feedback organized and actionable."',
      suggestions: [
        'Lack of...',
        'Inefficiency in...',
        'Difficulty with...'
      ]
    },
    {
      key: 'targetCustomer',
      label: 'Who is your target customer?',
      definition: 'Describe the main user or buyer for your product.',
      example: 'Eg: "Freelance designers and small creative agencies."',
      suggestions: [
        'A mobile app for...',
        'A SaaS tool for...',
        'A marketplace connecting...'
      ]
    },
    {
      key: 'strengthsWeaknesses',
      label: 'What are the strengths and weaknesses of these competitors?',
      definition: 'Describe what your competitors do well and where they fall short.',
      example: 'Eg: "Notion is flexible but complex for new users."',
      suggestions: [
        'Flexible',
        'Expensive',
        'Hard to use',
        'Popular'
      ]
    },
    {
      key: 'opportunitiesThreats',
      label: 'What opportunities and threats do you see in the current market?',
      definition: 'List any trends, gaps, or risks you see for your startup in this space.',
      example: 'Eg: "Remote work is growing, but big players are entering the space."',
      suggestions: [
        'Remote work',
        'AI adoption',
        'Big tech competition',
        'Market growth'
      ]
    },
    {
      key: 'differentiation',
      label: 'How do you plan to differentiate your MVP from existing solutions?',
      definition: 'Explain what will make your MVP stand out from competitors.',
      example: 'Eg: "Simpler UI, faster onboarding, AI-powered insights."',
      suggestions: [
        'Simpler UI',
        'Faster onboarding',
        'AI-powered',
        'Cheaper'
      ]
    }
  ],
  market: [
    {
      key: 'marketDescription',
      label: 'Describe your target market and its current state',
      definition: 'Summarize the market you are targeting and any trends or changes you see.',
      example: 'Eg: "Indian SaaS market for SMBs, growing rapidly post-pandemic."',
      suggestions: [
        'SaaS for...',
        'E-commerce in...',
        'Healthcare tech in...'
      ]
    },
    {
      key: 'pmfApproach',
      label: 'How will you approach product-market fit for your MVP?',
      definition: 'Describe your plan to validate that your product solves a real problem for your target market.',
      example: 'Eg: "Run pilot with 10 SMBs and measure retention after 1 month."',
      suggestions: [
        'Pilot with...',
        'Beta launch',
        'User interviews'
      ]
    },
    {
      key: 'launchPlan',
      label: 'Where do you plan to launch first and why?',
      definition: 'Specify the city, country, or region for your initial launch and your reasoning.',
      example: 'Eg: "Bangalore, because of high density of tech startups."',
      suggestions: [
        'Bangalore',
        'Delhi NCR',
        'US',
        'Europe'
      ]
    }
  ],
  competitive: [
    {
      key: 'competitors',
      label: 'Who do you see as your main competitors at the MVP stage?',
      definition: 'List any companies, products, or approaches that solve the same problem as you.',
      example: 'Eg: "Notion, Trello, Google Docs for collaboration."',
      suggestions: [
        'Notion',
        'Trello',
        'Google Docs',
        'Pen & paper'
      ]
    },
    {
      key: 'strengthsWeaknesses',
      label: 'What are the strengths and weaknesses of these competitors?',
      definition: 'Describe what your competitors do well and where they fall short.',
      example: 'Eg: "Notion is flexible but complex for new users."',
      suggestions: [
        'Flexible',
        'Expensive',
        'Hard to use',
        'Popular'
      ]
    },
    {
      key: 'opportunitiesThreats',
      label: 'What opportunities and threats do you see in the current market?',
      definition: 'List any trends, gaps, or risks you see for your startup in this space.',
      example: 'Eg: "Remote work is growing, but big players are entering the space."',
      suggestions: [
        'Remote work',
        'AI adoption',
        'Big tech competition',
        'Market growth'
      ]
    },
    {
      key: 'differentiation',
      label: 'How do you plan to differentiate your MVP from existing solutions?',
      definition: 'Explain what will make your MVP stand out from competitors.',
      example: 'Eg: "Simpler UI, faster onboarding, AI-powered insights."',
      suggestions: [
        'Simpler UI',
        'Faster onboarding',
        'AI-powered',
        'Cheaper'
      ]
    }
  ]
};


function QAFlow() {
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const { type } = useParams();
  const navigate = useNavigate();
  const questions = flows[type] || [];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  if (!questions.length) return <div>Invalid flow type.</div>;

  const q = questions[step];
  const progress = Math.round(((step + 1) / questions.length) * 100);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, [step, type]);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, [progress]);

  const handleNext = () => {
    // On first step, include file in answers
    if (step === 0 && file) {
      setAnswers({ ...answers, [q.key]: input, _file: file });
    } else {
      setAnswers({ ...answers, [q.key]: input });
    }
    setInput('');
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Submit: increment analysis count in localStorage
  let count = Number(localStorage.getItem('analysisCount') || '0');
  count += 1;
  localStorage.setItem('analysisCount', count);
      // Submit: navigate to loading screen with answers and file (if any)
      const finalAnswers = { ...answers, [q.key]: input };
      if (file) finalAnswers._file = file;
      navigate('/loading', { state: { type, answers: finalAnswers } });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setInput(answers[questions[step - 1].key] || '');
    }
  };

  return (
    <div
      className="qaflow-root"
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
        position: 'relative',
      }}
    >
      {/* Gradient background box behind the card */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -54%)',
          width: 700,
          maxWidth: '90vw',
          height: 220,
          background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
          borderRadius: 28,
          zIndex: 0,
          boxShadow: '0 8px 32px 0 rgba(161, 140, 209, 0.10)',
          filter: 'blur(0.5px)',
        }}
        aria-hidden="true"
      />
      <div
        ref={cardRef}
        style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
          padding: '54px 48px 48px 48px',
          maxWidth: 700,
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Home screen title and subtitle for all flows */}
        <div style={{ marginBottom: 18 }}>
          <h1 style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            margin: 0,
            color: '#222',
            letterSpacing: '-1px',
            textAlign: 'center',
          }}>
            Discover the Best Startup Tools & Analysis
          </h1>
          <p style={{
            fontSize: '1.08rem',
            color: '#444',
            margin: '10px 0 0 0',
            textAlign: 'center',
            lineHeight: 1.5,
          }}>
            A curated platform for founders and innovators. Analyze your idea, validate your market, and outsmart the competition with data-driven insights. <span style={{color:'#0078d4'}}>Inspired by the world’s best digital products.</span>
          </p>
        </div>
        {type === 'mvp' && step === 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            color: '#0078d4',
            borderRadius: 10,
            padding: '14px 18px',
            marginBottom: 22,
            fontWeight: 500,
            fontSize: '1.05rem',
            boxShadow: '0 2px 8px #b3c0d81a'
          }}>
          {/*<strong>Status Update (Aug 15, 2025):</strong> The platform now features a modern, multi-step Q&A flow, Gemini-powered backend, and improved UI/UX. Analysis is always realistic—never "No analysis generated"—and results are formatted for clarity. -- GitHub Copilot*/}
          </div>
        )}
        <div className="qaflow-progress" style={{ marginBottom: 18 }}>
          <div
            className="qaflow-progress-bar"
            ref={progressRef}
            style={{
              height: 7,
              borderRadius: 6,
              background: '#a18cd1',
              width: `${progress}%`,
              transition: 'width 0.3s',
            }}
          />
        </div>
        <div className="qaflow-label" style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 8 }}>{q.label}</div>
        <div className="qaflow-definition" style={{ color: '#444', marginBottom: 6 }}>{q.definition}</div>
        <div className="qaflow-example" style={{ color: '#888', fontSize: '0.98rem', marginBottom: 18 }}>{q.example}</div>
        <textarea
          className="qaflow-textarea"
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={3}
          placeholder="Type your answer here..."
          style={{
            width: '100%',
            borderRadius: 8,
            border: '1.5px solid #e0e0e0',
            padding: '10px 12px',
            fontSize: '1.05rem',
            marginBottom: 16,
            boxSizing: 'border-box',
            background: '#fff'
          }}
        />
        {step === 0 && (
          <div style={{ margin: '12px 0 18px 0' }}>
            <label style={{ fontWeight: 500, color: '#0078d4' }}>
              Optionally upload a file (PDF, DOCX, TXT):
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'block', marginTop: 6 }}
                onChange={e => setFile(e.target.files[0])}
              />
              {file && <span style={{ marginLeft: 8, color: '#222' }}>{file.name}</span>}
            </label>
          </div>
        )}
        <div className="qaflow-suggestions" style={{ marginBottom: 18 }}>
          {q.suggestions.map(s => (
            <button
              key={s}
              className="qaflow-suggestion-btn"
              onClick={() => setInput(input ? input + ' ' + s : s)}
              type="button"
              style={{
                margin: '0 8px 8px 0',
                background: '#f5f5f5',
                color: '#333',
                border: '1px solid #e0e0e0',
                borderRadius: 7,
                padding: '7px 14px',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 1px 4px #0001',
                fontSize: '0.98rem',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="qaflow-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            className="qaflow-btn"
            onClick={handleBack}
            disabled={step === 0}
            style={{
              background: '#f5f5f5',
              color: '#185a9d',
              border: '1px solid #e0e0e0',
              borderRadius: 7,
              padding: '8px 22px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              opacity: step === 0 ? 0.6 : 1,
              boxShadow: '0 1px 4px #0001',
              transition: 'opacity 0.2s',
            }}
          >
            Back
          </button>
          <button
            className="qaflow-btn"
            onClick={handleNext}
            disabled={!input.trim() || (Number(localStorage.getItem('analysisCount') || '0') >= 1000 && step === questions.length - 1)}
            style={{
              background: '#a18cd1',
              color: '#fff',
              border: 'none',
              borderRadius: 7,
              padding: '8px 22px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: (!input.trim() || (Number(localStorage.getItem('analysisCount') || '0') >= 1000 && step === questions.length - 1)) ? 'not-allowed' : 'pointer',
              opacity: (!input.trim() || (Number(localStorage.getItem('analysisCount') || '0') >= 1000 && step === questions.length - 1)) ? 0.6 : 1,
              boxShadow: '0 1px 4px #0001',
              transition: 'opacity 0.2s',
            }}
          >
            {step === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QAFlow;
