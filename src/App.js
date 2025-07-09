import React, { useState } from 'react';
import ResultForm from './ResultForm';
import ResultDisplay from './ResultDisplay';
import './styles.css';
import { fetchResult } from './api';

export default function App() {
  const [resultHtml, setResultHtml] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (form) => {
    setLoading(true);
    setError('');
    setResultHtml('');
    try {
      const res = await fetchResult(form);
      setResultHtml(res);
    } catch (e) {
      setError('Could not fetch result. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="main-container">
      <h1 className="main-title">Bangladesh Board Results Clone</h1>
      <ResultForm onSubmit={handleSubmit} loading={loading} />
      <ResultDisplay resultHtml={resultHtml} error={error} />
    </div>
  );
} 