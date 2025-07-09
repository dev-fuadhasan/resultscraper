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
    const $ = cheerio.load(html);
    let question = '';
    // Find the <input name="value_s">, get its parent <tr>, then the second <td>
    const input = $('input[name="value_s"]');
    if (input.length) {
      const tr = input.closest('tr');
      const tds = tr.find('td');
      if (tds.length >= 2) {
        question = $(tds[1]).text().trim();
      }
    }
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