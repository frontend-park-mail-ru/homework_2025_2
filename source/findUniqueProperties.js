'use strict';
 
/**
 * Функция, возвращающая объект с уникальными свойствами из произвольного числа объектов
 * @param {...Object} objects - объекты
 * 
 * @example
 * // returns { a: 1, d: 5, e: 6 }
 *  findUniqueProperties(
 *  { a: 1, b: 2, c: 3 },
 *  { b: 2, c: 4, d: 5 },
 *  { b: 2, e: 6 }
 *  );
 * 
 * @returns {Object} 
 */

const findUniqueProperties = (...objects) => {
    const result = {};
    
    objects.forEach(obj => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (result[key] == null) { 
                    result[key] = obj[key];
                } else {
                    delete result[key];
                } 
            }
        }
    });
    
    return result;
}    
