/**
 * Script defines scraper module. scraper exports a single method
 * that scrapes coronavirus numbers for countries listed on page,
 * returning them as an array of json objects.
 *
 * @author atifcppprogrammer
 */

// Importing required programmer modules.
const constants = require('./constants');

// Importing required node modules.
const cheerio = require('cheerio');
const fetch = require('node-fetch');

/**
 * Promise makes GET request to load required page and resolves
 * with its html content.
 * @description
 *
 * @promise
 */
const html = fetch(constants.urls.core).then(res =>
  res.text());

/**
 * Helper method filters out trailing spaces found in extracted
 * text from html table.
 * @description
 *
 * @method
 */
const cleanUp = text => {
  const filtered = text.split('').filter(e =>
    !(new Set(['+', ',']).has(e))).join('');
  text = filtered == '' ? '0' : filtered;
  return isNaN(text) ? text : parseInt(text);
}

/**
 * Method generates json for country using names of columns and
 * cheerio object representing table row for respective country
 * @description
 *
 * @method
 */
const jsonify = ($, row) => {
  const names = constants.names, json = {};
  $(row).find('td').slice(1, 14).each((j, element) =>
    json[names[j]] = cleanUp($(element).text()));
  return json;
}

/**
 * Method collects details from the countries table on the page
 * and returns them as an array of json objects, one for each
 * country.
 * @description
 *
 * @exports
 * @method
 */
exports.collectData = async () => {
  // Collecting page's html and assigning cheerio root.
  const content = await html;
  const $ = cheerio.load(content);
  // Collecting and returning data from table.
  const selector = constants.selectors.countries;
  const data = [];
  $(selector).each((j, row) => {
    let countryData = jsonify($, row);
    data.push(countryData);
  });
  return data;
}
