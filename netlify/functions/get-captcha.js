const fetch = require('node-fetch');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
  const res = await fetch('http://www.educationboardresults.gov.bd/');
  const html = await res.text();
  const $ = cheerio.load(html);
  // Find the captcha question (e.g., '7 + 1')
  let question = '';
  $('td').each((i, el) => {
    const text = $(el).text();
    if (/\d+\s*\+\s*\d+/.test(text)) {
      question = text.match(/(\d+\s*\+\s*\d+)/)?.[1];
    }
  });
  if (question) {
    return {
      statusCode: 200,
      body: JSON.stringify({ question })
    };
  }
  return { statusCode: 500, body: 'Captcha not found' };
}; 