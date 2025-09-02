'use strict';

/**
 * Функция, возвращающая копию объекта
 * @param {Object} obj - объект
 * 
 * @example
 * // returns { a: 1, b: 2 }
 * deepClone({ a: 1, b: 2 });
 * 
 * @returns {Object}
 * */

const deepClone = obj => JSON.parse(JSON.stringify(obj));