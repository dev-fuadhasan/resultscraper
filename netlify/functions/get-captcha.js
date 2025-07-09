const fetch = require('node-fetch');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
  try {
    const res = await fetch('http://www.educationboardresults.gov.bd/');
    if (!res.ok) {
      console.error('Network error:', res.status, res.statusText);
      return { statusCode: 500, body: 'Failed to fetch captcha page' };
    }
    const html = await res.text();
    console.log('Fetched HTML:', html.slice(0, 1000)); // Log first 1000 chars for brevity
    const $ = cheerio.load(html);
    let question = '';
    $('td, span, div').each((i, el) => {
      const text = $(el).text();
      if (/\d+\s*\+\s*\d+/.test(text)) {
        question = text.match(/(\d+\s*\+\s*\d+)/)?.[1];
      }
    });
    console.log('Captcha question:', question);
    if (question) {
      return {
        statusCode: 200,
        body: JSON.stringify({ question })
      };
    }
    return { statusCode: 500, body: 'Captcha not found' };
  } catch (e) {
    console.error('Error in get-captcha:', e);
    return { statusCode: 500, body: 'Error fetching captcha' };
  }
}; 