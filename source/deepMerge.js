'use strict';

/**
 * Проверка значения на не null, тип object и не массив
 * @param {any} val - объект для проверки
 * 
 * @example
 * // returns true
 * isObject({ a: 1 })
 * 
 * @returns {boolean}
 */
const isObject = (val) => val !== null && typeof(val) === 'object' && !Array.isArray(val)

/**
 * Глубокое объединение двух объектов
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам являются объектами, то они должны быть объединены рекурсивно. 
 * Если значения не являются объектами, то значение из второго объекта должно перезаписывать значение из первого.
 * @param {Object} source - исходный объект
 * @param {Object} target - объект с новыми значениями
 * 
 * @example
 * // returns { a: 1, b: { c: 2, d: 3 }, e: 5 }
 * deepMerge({ a: 1, b: { c: 2 }, e: 4 }, { b: { d: 3 }, e: 5 });
 * 
 * @returns {Object}
 */
const deepMerge = (source, target) => {
    const result = {...source};

    Object.entries(target).forEach(([k, v]) => {
        if (isObject(result[k]) && isObject(v)) {
            result[k] = deepMerge(result[k], v);
        }
        else {
            result[k] = v;
        }
    })

    return result;
}