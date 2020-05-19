module.exports = {
  'names': ['Country', 'Total_Cases', 'New_Cases', 'Total_Deaths', 'New_Deaths',
    'Total_Recovered', 'Active_Cases', 'Serious_Cases', 'Cases_Per_Million',
    'Total_Cases_Per_Million', 'Deaths_Per_Million', 'Total_Tests', 'Population'],
  'selectors': {
    'countries': 'div.main_table_countries_div > table > tbody > tr[style=""]',
    'columns': 'div.main_table_countries_div > table > thead > tr > th'
  },
  'urls': {
    'core': 'https://www.worldometers.info/coronavirus/'
  }
};
