import React, { useEffect, useState } from 'react';
import './IntroSequence.css';

const WORDS = ['STARTUP', 'FOR', 'IMPACT'];

export default function IntroSequence({ onFinish }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < WORDS.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 900);
      return () => clearTimeout(timer);
    } else {
      // Wait a bit on last word, then finish
      const timer = setTimeout(() => onFinish && onFinish(), 900);
      return () => clearTimeout(timer);
    }
  }, [index, onFinish]);

  return (
    <div className="intro-sequence-root">
      <div className="intro-sequence-word">{WORDS[index]}</div>
    </div>
  );
}
