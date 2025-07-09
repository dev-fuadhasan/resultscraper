// Requires node-fetch v2 for CommonJS compatibility
const fetch = require('node-fetch');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
  try {
    const res = await fetch('http://www.educationboardresults.gov.bd/');
    if (!res.ok) {
      return { statusCode: 500, body: 'Failed to fetch captcha page' };
    }
    const html = await res.text();
    const $ = cheerio.load(html);
    let raw = '';
    // Find the <td> that contains the math question (e.g., '2 + 1')
    $('td').each((i, el) => {
      const text = $(el).text().trim();
      if (/^\d+\s*\+\s*\d+$/.test(text)) {
        raw = text;
      }
    });
    if (raw) {
      return {
        statusCode: 200,
        body: JSON.stringify({ raw })
      };
    }
    return { statusCode: 500, body: 'Captcha not found' };
  } catch (e) {
    return { statusCode: 500, body: 'Error fetching captcha: ' + e.message };
  }
}; 
