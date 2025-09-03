'use strict';

/**
 * Глубокое объединение двух объектов
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам являются объектами, то они должны быть объединены рекурсивно. 
 * Если значения не являются объектами, то значение из второго объекта должно перезаписывать значение из первого.
 * @param {Object} source - исходный объект
 * @param {Object} target - объект с новыми значениями
 * @param {Object} [result={}] - результирующий объект
 * 
 * @example
 * // returns { a: 1, b: { c: 2, d: 3 }, e: 5 }
 * deepMerge({ a: 1, b: { c: 2 }, e: 4 }, { b: { d: 3 }, e: 5 });
 * 
 * @returns {Object}
 */
const deepMerge = (source, target, result = {}) => {

    Object.entries(source).forEach(([k, v]) => {
        result[k] = (typeof(v) === 'object' && v !== null && !Array.isArray(v)) ? deepMerge(v, {}, {}) : v;
    })

    Object.entries(target).forEach(([k, v]) => {
        if (!(k in source) || typeof(v) !== typeof(source[k]) || typeof(v) !== 'object' || v === null || Array.isArray(v)) {
            result[k] = v;
        }
        else {
            result[k] = deepMerge(source[k], v, result[k]);
        }
    })

    return result;
}