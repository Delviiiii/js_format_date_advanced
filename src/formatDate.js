'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  function formatYear(initialYear, finalYear) {
    if (initialYear.length !== finalYear.length) {
      if (initialYear.length === 4) {
        return `${initialYear[2]}${initialYear[3]}`;
      }

      if (initialYear.length === 2) {
        if (+initialYear < 30) {
          return `20${initialYear[0]}${initialYear[1]}`;
        } else {
          return `19${initialYear[0]}${initialYear[1]}`;
        }
      }
    }

    return initialYear;
  }

  const fromSeparator = fromFormat[3];
  const convertedDate = date.split(fromSeparator);
  let year;
  let month;
  let day;

  // Определяет изначальный формат даты и конвертирует её в массив
  if (fromFormat[0].includes('Y') && fromFormat[1].includes('M')) {
    [year, month, day] = convertedDate;
  }

  if (fromFormat[0].includes('M') && fromFormat[1].includes('Y')) {
    [month, year, day] = convertedDate;
  }

  if (fromFormat[0].includes('M') && fromFormat[1].includes('D')) {
    [month, day, year] = convertedDate;
  }

  let formatedDate = '';
  const result = [];

  // Формирует массив согласно переданому формату
  if (toFormat[0].includes('Y') && toFormat[1].includes('M')) {
    // Функция для конвертации года в две стороны
    year = formatYear(year, toFormat[0]);

    result.push(year, month, day);
    formatedDate = result.join(toFormat[3]);

    return formatedDate;
  }

  if (toFormat[0].includes('D') && toFormat[1].includes('M')) {
    year = formatYear(year, toFormat[2]);

    result.push(day, month, year);
    formatedDate = result.join(toFormat[3]);

    return formatedDate;
  }

  if (toFormat[0].includes('M') && toFormat[1].includes('D')) {
    year = formatYear(year, toFormat[2]);

    result.push(month, day, year);
    formatedDate = result.join(toFormat[3]);

    return formatedDate;
  }
}

module.exports = formatDate;
