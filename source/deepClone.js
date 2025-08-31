'use strict';

/**
 * Функция, глубокого копирования объекта
 * @param {Object} obj - объект с неограниченной вложенностью
 * 
 * @example
 * // returns { a: 1, b: 2 }
 * deepClone({ a: 1, b: 2 });
 * 
 * @returns {Object}
 */
const deepClone = obj => JSON.parse(JSON.stringify(obj));


