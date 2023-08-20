const ascendingMode = (countryA, countryB) =>
  countryA.name.official.localeCompare(countryB.name.official);

const descendingMode = (countryA, countryB) =>
  countryB.name.official.localeCompare(countryA.name.official);

const modal = new tingle.modal({
  footer: false,
  stickyFooter: false,
  closeMethods: ['overlay', 'button', 'escape'],
  closeLabel: 'Close',
  cssClass: ['custom-class-1', 'custom-class-2']
});

const getCapital = capital => (capital ? capital : 'No capital');

const getLanguage = language =>
  language ? Object.values(language) : 'No language to display';

export default {
  ascendingMode,
  descendingMode,
  modal,
  getCapital,
  getLanguage
};
