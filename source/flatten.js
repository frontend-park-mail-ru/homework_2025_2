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
  const result = [];
  arr.map(item => {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  });
  return result;
};
