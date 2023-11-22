const ascendingMode = (countryA, countryB) =>
  countryA.name.official.localeCompare(countryB.name.official);

const descendingMode = (countryA, countryB) =>
  countryB.name.official.localeCompare(countryA.name.official);

const getCapital = capital => (capital ? capital : 'No capital');

const getLanguage = language =>
  language ? Object.values(language) : 'No language to display';

export default {
  ascendingMode,
  descendingMode,
  getCapital,
  getLanguage
};
