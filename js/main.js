'use-strict';

import utils from './utils.js';
import modal from './modal.js';

// * Table content
const countriesTable = document.querySelector('#countries');
const toggleBtn = document.querySelector('#toggle');
const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');

// * Order mode
const ASCENDING = `Ascending Mode`;
const DESCENDING = `Descending Mode`;

// * Pagination
const itemsPerPage = 10;
let currentPage = 1;
let startIndex = 0;
let endIndex = 10;

const controlPagination = currentPage => {
  startIndex = (currentPage - 1) * itemsPerPage;
  endIndex = startIndex + itemsPerPage;
};

const fetchCountries = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  return await response.json();
};

const fetchSummaryCountry = async country => {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${country}`
  );
  return await response.json();
};

const createCell = countryData => {
  const cell = document.createElement('td');
  cell.textContent = countryData;
  return cell;
};

const createTable = countries => {
  countries.map(country => {
    const row = document.createElement('tr');
    const {
      name: { official: countryName },
      capital,
      region,
      languages,
      population,
      flag
    } = country;

    row.appendChild(createCell(countryName));
    row.appendChild(createCell(utils.getCapital(capital)));
    row.appendChild(createCell(region));
    row.appendChild(createCell(utils.getLanguage(languages)));
    row.appendChild(createCell(population));
    row.appendChild(createCell(flag));

    row.addEventListener('click', async () => {
      const sumary = await fetchSummaryCountry(countryName);
      modal.openModal();
      modal.country.textContent = countryName;
      modal.countryContent.textContent = sumary.extract;
    });

    modal.btnCloseModal.addEventListener('click', modal.closeModal);
    modal.overlay.addEventListener('click', modal.closeModal);

    countriesTable.appendChild(row);
  });
};

const updateTable = countries => {
  while (countriesTable.firstChild) {
    countriesTable.removeChild(countriesTable.firstChild);
  }

  createTable(countries);
};

window.addEventListener('DOMContentLoaded', async () => {
  const countries = await fetchCountries();

  countries.sort(utils.ascendingMode);
  createTable(countries.slice(startIndex, endIndex));

  let sortOrder = DESCENDING;

  toggleBtn.addEventListener('click', () => {
    sortOrder = sortOrder === DESCENDING ? ASCENDING : DESCENDING;

    toggleBtn.textContent = sortOrder;

    countries.sort(
      sortOrder === ASCENDING ? utils.descendingMode : utils.ascendingMode
    );
    updateTable(countries.slice(startIndex, endIndex));
  });

  previousBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      controlPagination(currentPage);
      updateTable(countries.slice(startIndex, endIndex));
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(countries.length / itemsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      controlPagination(currentPage);
      updateTable(countries.slice(startIndex, endIndex));
    }
  });
});
