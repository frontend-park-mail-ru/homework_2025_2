"use strict";

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
const deepClone = (obj) => {
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    let result = {};
    Object.entries(obj).forEach(([k, v]) => {
      result[k] = deepClone(v);
    });
    return result;
  }

  if (Array.isArray(obj)) {
    let result = [];
    obj.forEach((val) => result.push(deepClone(val)));
    return result;
  }
  return obj;
};
