import React, { useState, useEffect } from 'react';
import { fetchCaptcha } from './api';

const EXAMS = [
  { value: 'ssc', label: 'SSC/Dakhil/Equivalent' },
  { value: 'jsc', label: 'JSC/JDC' },
  { value: 'hsc', label: 'HSC/Alim/Equivalent' },
];
const BOARDS = [
  { value: 'barisal', label: 'Barisal' },
  { value: 'chittagong', label: 'Chittagong' },
  { value: 'comilla', label: 'Comilla' },
  { value: 'dhaka', label: 'Dhaka' },
  { value: 'dinajpur', label: 'Dinajpur' },
  { value: 'jessore', label: 'Jessore' },
  { value: 'mymensingh', label: 'Mymensingh' },
  { value: 'rajshahi', label: 'Rajshahi' },
  { value: 'sylhet', label: 'Sylhet' },
  { value: 'madrasah', label: 'Madrasah' },
  { value: 'tec', label: 'Technical' },
  { value: 'dibs', label: 'DIBS(Dhaka)' },
];

export default function ResultForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    exam: 'ssc',
    year: new Date().getFullYear().toString(),
    board: 'dhaka',
    roll: '',
    reg: '',
    value_s: '',
  });
  const [captchaQ, setCaptchaQ] = useState('');
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [error, setError] = useState('');

  const loadCaptcha = async () => {
    setCaptchaLoading(true);
    setError('');
    try {
      const { question } = await fetchCaptcha();
      setCaptchaQ(question);
    } catch (e) {
      setError('Could not load captcha. Try reload.');
    }
    setCaptchaLoading(false);
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="result-form">
      <div className="form-group">
        <label>Examination</label>
        <select name="exam" value={form.exam} onChange={handleChange} required>
          {EXAMS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Year</label>
        <input name="year" type="number" value={form.year} onChange={handleChange} required min="1996" max={new Date().getFullYear()} />
      </div>
      <div className="form-group">
        <label>Board</label>
        <select name="board" value={form.board} onChange={handleChange} required>
          {BOARDS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Roll</label>
        <input name="roll" type="text" value={form.roll} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Registration No</label>
        <input name="reg" type="text" value={form.reg} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Captcha (Plus Code)</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, marginRight: 8 }}>{captchaQ || '...'}</span>
          <button type="button" onClick={loadCaptcha} disabled={captchaLoading} style={{ marginRight: 8 }}>
            {captchaLoading ? 'Loading...' : 'Reload'}
          </button>
          <input name="value_s" type="text" value={form.value_s} onChange={handleChange} required maxLength={4} style={{ width: 80 }} />
        </div>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={loading}>Get Result</button>
    </form>
  );
} 