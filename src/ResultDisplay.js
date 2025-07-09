import React from 'react';

export default function ResultDisplay({ resultHtml, error }) {
  if (error) return <div className="result-display" style={{ color: '#d32f2f', background: '#ffebee', border: '2px solid #ffcdd2' }}>{error}</div>;
  if (!resultHtml) return null;
  return (
    <div className="result-display">
      <div dangerouslySetInnerHTML={{ __html: resultHtml }} />
    </div>
  );
} 