'use strict';

/**
 * Функция, принимающая на вход вложенный массив и возвращающая плоский массив
 * @param {Array<any>} arr - массив любых элементов
 *
 * @example
 * // returns [1, 2, 3]
 * flatten([1, [2, [3]]]);
 *
 * @returns {Array<any>} Новый плоский массив
 */
const flatten = arr => {
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array');
  }
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...flatten(item));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
};
