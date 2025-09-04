'use strict';
 
/**
 * Функция, возвращающая объект с уникальными свойствами из произвольного числа объектов
 * @param {...Object} objects - передаваемые объекты
 * 
 * @example
 * // returns { a: 1, d: 5, e: 6 }
 * findUniqueProperties(
 *  { a: 1, b: 2, c: 3 },
 *  { b: 2, c: 4, d: 5 },
 *  { b: 2, e: 6 }
 * );
 * 
 * @returns {Object} - объект с уникальными properties
 */
const findUniqueProperties = (...objects) => {
    const result = {};
    const keyCounts = {};
    
    objects.forEach(obj => {
        Object.keys(obj).forEach(key => {
            if (keyCounts[key] === undefined) {
                keyCounts[key] = 0;
            }

            keyCounts[key] += 1;

            if (keyCounts[key] === 1) { 
                result[key] = obj[key];
            } else if (keyCounts[key] === 2) {
                delete result[key];
            } 
        })
    });
    
    return result;
}    
