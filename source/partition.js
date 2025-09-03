'use strict';

/**
 * Разделяет массив на два подмассива на основе предиката
 * @param {Array<Number>} arr - исходный массив чисел
 * @param {Function} predicate - функция-предикат
 * 
 * @example
 * //returns [[2,4,6],[1,3,5]]
 * partition ([1,2,3,4,5,6], num => num%2 === 0)
 * 
 * @returns {Array<Array>} 
 */
const partition = (arr, predicate) => arr.reduce(
    ([pass, fail], elem) => predicate(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]], 
    [[],[]]
);
