'use strict';

/**
 * Функция, определяющая максимальное число в массиве
 * @param {Array<Number>} numbers - массив чисел
 * 
 * @example
 * // returns 3
 * max([1, 2, 3]);
 * 
 * @returns {Number}
 */
const max = numbers => Math.max(...numbers);




/**
 * Глубокое объединение двух лбъектов
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам являются объектами, то они должны быть объединены рекурсивно. 
 * Если значения не являются объектами, то значение из второго объекта должно перезаписывать значение из первого.
 * @param {Object} source - исходный объект и объект для изменений
 * @param {Object} target - объект с новыми значениями
 * 
 * @example
 * // returns { a: 1, b: { c: 2, d: 3 } }
 * deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 } });
 * 
 * @returns {Object}
 */
const deepMerge = (source, target) => {
    Object.entries(target).forEach(([k ,v]) => {
        if (!(k in source) || typeof(v) !== 'object' || v === null || Array.isArray(v)){
            source[k] = v
        }
        else{
            deepMerge(source[k], v)
        }
    })
    return source
}