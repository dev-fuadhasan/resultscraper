const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const { exam, year, board, roll, reg, value_s } = JSON.parse(event.body);
  const params = new URLSearchParams({
    sr: '3', et: '2', exam, year, board, roll, reg, value_s, button2: 'Submit'
  });
  const res = await fetch('http://www.educationboardresults.gov.bd/result.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'http://www.educationboardresults.gov.bd/',
      'User-Agent': 'Mozilla/5.0',
    },
    body: params
  });
  const html = await res.text();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: html
  };
}; 