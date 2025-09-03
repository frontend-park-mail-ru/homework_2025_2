'use strict';

/**
 * Функция, которая принимает вложенный массив (массив, содержащий другие массивы) 
 * и возвращает новый массив, в котором все элементы из вложенных массивов находятся на одном уровне.
 * @param {Array<Array>} input - вложенный массив чисел
 * 
 * @example
 * // returns [1, {"a": 1}, 3, "abc", {"a": 1}, {"b": 1}, {"b": 1}, 1.23, {"c": 1}]
 * flatten([1, {"a": 1}, 3, "abc", {"a": 1}, {"b": 1}, [{"b": 1}, [1.23, {"c": 1}]]]);
 * 
 * @returns {Array}
 */
const flatten = function(input) {
    let result = [];
    if (!Array.isArray(input)) {
        return result;
    }
    for (let i = 0; i < input.length; i++) {
        if (Array.isArray(input[i])) {
            result = result.concat(flatten(input[i]));
        } else {
            result.push(input[i]);
        }
    }
    return result;
};
