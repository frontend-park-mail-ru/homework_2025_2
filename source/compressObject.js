'use strict';

/**
 * Принимает объект и возвращает новый объект, содержащий только те ключи, которые имеют значения,
 * отличные от null, undefined или пустой строки.
 *
 * @param {Object} obj - исходный объект
 * 
 * @example
 * // returns { name: "Андрей", country: "Россия" }
 * compressObject({ name: "Андрей", age: null, city: "", country: "Россия", occupation: undefined });
 * 
 * @returns {Object} result - новый объект без значений null, undefined, ""
*/
function compressObject(obj){
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) =>
            value !== null && value !== undefined && value !== ""
        )
    );
}
