'use strict';

/**
 * Функция, которая принимает вложенный массив (массив, содержащий другие массивы) 
 * и возвращает новый массив, в котором все элементы из вложенных массивов находятся на одном уровне.
 * @param {Array<Array>} input - вложенный массив чисел
 * @param {Array<Numbers>} result - результирующий массив
 * 
 * @example
 * // returns [1, 2, 3, 4, 5]
 * flatten([1, 2, 3, 1, 2, [1, 1], [4, 4, 5, [2, 3]]]);
 * 
 * @returns {Array<Numbers>}
 */
const flatten = function(input, result=[]) {
    input.forEach(function(item, i, arr) {
        if (Array.isArray(item)) {
            flatten(item, result);
        } else {
            if (!result.includes(item)) {
                result.push(item);
            }
        }
    });
    return result;
};