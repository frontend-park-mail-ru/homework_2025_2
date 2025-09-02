"use strict";

/**
 * Функция, глубокого копирования объекта
 * @param {*} obj - объект с неограниченной вложенностью
 *
 * @example
 * // returns { a: 1, b: 2 }
 * deepClone({ a: 1, b: 2 });
 *
 * @returns {*}
 */
const deepClone = (obj) => {
  if (typeof obj !== "object" || obj == null || obj == undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map((val) => deepClone(val));
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Map) {
    return new Map(obj);
  }

  if (obj instanceof Set) {
    return new Set(obj);
  }

  let result = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      result[key] = deepClone(obj[key]);
  }

  return result;
};
