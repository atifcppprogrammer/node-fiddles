/**
 * Script defines app module. app is the main entry point of the
 * application, using commander to collect country name and then
 * show details for it.
 *
 * @author atifcppprogrammer
 */

// Importing required modules.
const scraper = require('./modules/scraper');
const program = require('commander');

// Defining commander options.
const description = 'name of country whose details you require';
const flag = '-c, --country <name>';
program.version('0.0.1').option(flag, description);
program.parse(process.argv);

// Aborting if country name is not provided.
if (!program.country) {
  console.log('name of country is mandatory');
  process.exit(1);
}

// Collecting country data, exiting in the event error occurs.
const countryData = scraper.collectData().catch((err) => {
  console.log('Check your internet connection !!!');
  process.exit(1);
});

/**
 * Method searches for given country through scraped data and
 * prints its details on the console.
 * @description
 *
 * @method
 */
const printCountryDetails = (async () => {
  // Collecting details for country.
  const data = await countryData, country = program.country;
  const details = data.filter(e =>
    e.Country.toLowerCase() == country.toLowerCase());
  // Showing data.
  if(details.length == 0)
    console.log(`No details found for ${country}`);
  else console.log(details.shift());
})();
