
import React, { useEffect, useState } from 'react';
import Counter from '../src/Counter';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const features = [
  {
    key: 'mvp',
    title: 'MVP Market Analysis',
    description: 'Analyze your MVP idea, market, and competitors with real data.',
    example: 'Eg: "A platform for remote team collaboration"',
    icon: '🚀'
  },
  {
    key: 'market',
    title: 'Market Details & Product-Market Fit',
    description: 'Get insights on market trends, PMF, and launch strategy.',
    example: 'Eg: "Targeting SaaS for Indian SMBs"',
    icon: '📊'
  },
  {
    key: 'competitive',
    title: 'Competitive Analysis',
    description: 'Understand your competition and SWOT with actionable advice.',
    example: 'Eg: "Competing with Notion and Trello"',
    icon: '⚔️'
  }
];

function Home() {
  const navigate = useNavigate();
  const [analysisCount, setAnalysisCount] = useState(0);
  useEffect(() => {
    // Sync with localStorage
    let count = Number(localStorage.getItem('analysisCount') || '0');
    setAnalysisCount(count);
    // Listen for storage changes (other tabs)
    const onStorage = () => {
      let c = Number(localStorage.getItem('analysisCount') || '1000');
      setAnalysisCount(c);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return (
    <div className="home-root">
      <header className="home-hero" style={{display:'flex',flexDirection:'column',alignItems:'center',position:'relative'}}>
        {/* Sticky Counter Card on right */}
        <div style={{
          position: 'fixed',
          top: 38,
          right: 32,
          zIndex: 100,
          width: 220,
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px 0 rgba(31,38,135,0.10)',
          border: '2.5px solid #a18cd1',
          padding: '22px 18px 18px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}>
          <Counter count={analysisCount} max={1000} />
          <div style={{fontWeight:600, fontSize:'1.08rem', color:'#222', textAlign:'center', marginTop:4}}>Free Startup Analysis</div>
          <div style={{fontSize:'0.98rem', color:'#666', textAlign:'center', marginBottom:6}}>
            {analysisCount}/1000 analyses left!<br/>
            <span style={{color:'#a18cd1'}}>Get your startup reviewed for free.<br/>No credit card needed.</span>
          </div>
          <img src="https://i.imgflip.com/4/4t0m5.jpg" alt="Meme" style={{width: '90%', borderRadius: 10, marginTop: 4, boxShadow: '0 2px 8px #b3c0d81a'}} />
        </div>
        <h1 className="home-title">Discover the Best Startup Tools & Analysis</h1>
        <p className="home-subtitle">A curated platform for founders and innovators. Analyze your idea, validate your market, and outsmart the competition with data-driven insights. <span style={{color:'#a18cd1'}}>Inspired by the world’s best digital products.</span></p>
        <button className="home-cta" onClick={() => navigate('/start/mvp')}>Get Started</button>
      </header>
      <section className="home-features">
          {features.map((feature) => (
            <div key={feature.key} style={{ position: 'relative', width: 320, maxWidth: '90vw', minHeight: 210, margin: '0 0 12px 0' }}>
              {/* Gradient background card */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
                  borderRadius: 18,
                  zIndex: 0,
                  filter: 'blur(0.5px)',
                  opacity: 0.22,
                }}
                aria-hidden="true"
              />
              <button
                className="feature-card animate-fadein"
                aria-label={feature.title}
                onClick={() => navigate(`/start/${feature.key}`)}
                type="button"
                disabled={analysisCount >= 1000}
                style={{
                  position: 'relative',
                  background: '#fff',
                  borderRadius: 18,
                  boxShadow: '0 2px 8px #b3c0d81a',
                  padding: '32px 24px 24px 24px',
                  minHeight: 210,
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  opacity: analysisCount >= 1000 ? 0.6 : 1,
                  cursor: analysisCount >= 1000 ? 'not-allowed' : 'pointer',
                }}
              >
                <span className="feature-icon">{feature.icon}</span>
                <h2 className="feature-title">{feature.title}</h2>
                <p className="feature-desc">{feature.description}</p>
                <div className="feature-example">{feature.example}</div>
              </button>
            </div>
          ))}
      </section>
      <footer className="home-footer">
        <span>Inspired by <a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thesprucepets.com%2Fcute-dog-breeds-we-can-t-get-enough-of-4589340&psig=AOvVaw35f9FJJkOdwldJk3keBnba&ust=1755346732408000&source=images&cd=vfe&opi=89978449&ved=0CBgQjhxqFwoTCLDKoarmjI8DFQAAAAAdAAAAABAV" target="_blank" rel="noopener noreferrer">Dogs</a> & the world’s best digital products.</span>
      </footer>
    </div>
  );
}

export default Home;
