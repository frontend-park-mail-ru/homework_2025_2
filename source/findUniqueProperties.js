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

function findUniqueProperties (object1, object2) {
    const uniqueObject = {};
    
    for (let key in object1)
        if (!(key in object2))
            uniqueObject[key] = object1[key];
    for (let key in object2)
        if (!(key in object1))
            uniqueObject[key] = object2[key];
    
    return uniqueObject;
}