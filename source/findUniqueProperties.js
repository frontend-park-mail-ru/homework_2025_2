'use strict';

/**
 * Функция, выделяющая и возвращающая объект уникальных свойств из двух передаваемых объектов
 * @param {Object} object1 - первый передаваемый объект
 * @param {Object} object2 - второй передаваемый объект
 * @example
 * // returns { a: 1, d: 5 }
 * findUniqueProperties({ a: 1, b: 2, c: 3 }, { b: 2, c: 4, d: 5 });
 * @returns {Object}
 */

function findUniqueProperties (object1, object2) {
    if (typeof object1 != "object" || typeof object2 != "object")
        return {};

    const uniqueObject = {};
    
    for (let key in object1)
        if (!(key in object2))
            uniqueObject[key] = object1[key];
    for (let key in object2)
        if (!(key in object1))
            uniqueObject[key] = object2[key];
    
    return uniqueObject;
}